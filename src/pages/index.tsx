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
import onUsernameChanged from "@/events/onUsernameChanged"

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

	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		if (socket.connected) {
			setIsConnected(true)
		}

		socket.on("connect", () => setIsConnected(true))
		socket.on("disconnect", () => setIsConnected(false))

		socket.on("username_changed", detail =>
			onUsernameChanged(detail, setCurrentUsername),
		)

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
							<UserConnected />
						</div>
						<VerticalBar />
						<div className={styles.chat}>
							<div className={styles.message}>
								<Messagereceveid />
								<MessageSend />
							</div>
							<div>
								<Tapping />
								<InputBar />
							</div>
						</div>
					</main>
				</div>
			</>
		) : (
			<div>
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
