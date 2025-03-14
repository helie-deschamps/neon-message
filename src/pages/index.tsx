import Head from "next/head"
import { Geist, Geist_Mono } from "next/font/google"
import styles from "@/styles/Home.module.css"
import { useEffect, useState } from "react"
import { socket } from "@/socket"
import Messagereceveid from "@/components/MessageReceived"
import MessageSend from "@/components/MessageSend"
import InputBar from "@/components/InputBar"
import Tapping from "@/components/Tapping"
import UserConnected from "@/components/UserConnected"
import VerticalBar from "@/components/VerticalBar"
import onUpdatingUserList from "@/events/onUpdatingUsersList"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export default function Home() {
	const [currentUsername, setCurrentUsername] = useState<undefined | string>()
	const [, setCurrentPublicId] = useState<undefined | string>()

	const [isConnected, setIsConnected] = useState(false)

	const [usersList, setUsersList] = useState<
		{ publicId: string; username: string | undefined }[]
	>([])

	const [usersTyping, setUsersTyping] = useState<string[]>([])

	const [messages, setMessages] = useState<{ text: string, time: string, fromMe: boolean }[]>([])

	useEffect(() => {
		if (socket.connected) {
			setIsConnected(true)
		}

		socket.on("connect", () => setIsConnected(true))
		socket.on("disconnect", () => setIsConnected(false))

		socket.on("updating_users_list", detail =>
			onUpdatingUserList(
				detail,
				setUsersList,
				setCurrentPublicId,
				setCurrentUsername,
			),
		)
		socket.on("stared_typing", detail => {
			const { v }: { v: { username: string } } = JSON.parse(detail)
			setUsersTyping(previousUsersTyping => [...previousUsersTyping, v.username])
		})
		socket.on("ended_typing", detail => {
			const { v }: { v: { username: string } } = JSON.parse(detail)
			setUsersTyping(previousUsersTyping =>
				previousUsersTyping.filter(username => username !== v.username)
			)
		})
		socket.on("message_sent", detail => {
			const { v, id, you: { publicId } }: { v: { message: string }, id: string, you: { publicId: string } } = JSON.parse(detail)

			setMessages(previousMessages => [
				...previousMessages,
				{
					text: v.message,
					time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
					fromMe: id === publicId
				}
			])
		})


		return () => {
			socket.off("connect", () => setIsConnected(true))
			socket.off("disconnect", () => setIsConnected(false))
		}
	}, [])

	return isConnected ? (
		currentUsername ? (
			<>
				<Head>
					<title>Create Next App</title>
					<meta name="description" content="Generated by create next app" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<div className={`${geistSans.variable} ${geistMono.variable}`}>
					<main className={styles.main}>
						<div className={styles.user}>
							<UserConnected usersList={usersList} />
						</div>
						<VerticalBar />
						<div className={styles.chat}>
							<div className={styles.message}>
								{messages.reverse().map(
									(message, key) =>
												message.fromMe
													? (<MessageSend key={key} text={message.text} time={message.time} />)
													: (<Messagereceveid key={key} text={message.text} time={message.time} />)
									)}
							</div>
							<div>
								<Tapping usersTyping={usersTyping} />
								<InputBar
									onStartTyping={() => socket.emit("start_typing")}
									onEndTyping={() => socket.emit("end_typing")}
									onSend={value => {
										if (value !== "")
											socket.emit(
												"sending_message",
												JSON.stringify({ message: value }),
											)
									}}
								/>
							</div>
						</div>
					</main>
				</div>
			</>
		) : (
			<div className={styles.namebar}>
				<InputBar
					isFor="username"
					onSend={value => {
						if (value !== "")
							socket.emit(
								"change_username",
								JSON.stringify({ newUsername: value }),
							)
					}}
				/>
			</div>
		)
	) : (
		<p>Connection en cours</p>
	)
}
