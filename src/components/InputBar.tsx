import styles from "../styles/InputBar.module.css"
import { useEffect, useRef, useState } from "react"

export default function InputBar({
	isFor = "message",
	onSend = () => {},
	onStartTyping = () => {},
	onEndTyping = () => {},
}: {
	isFor?: "message" | "username"
	onSend?: (textInput: string) => void
	onStartTyping?: () => void
	onEndTyping?: () => void
}) {
	const [value, setValue] = useState<string>("")

	const [isTyping, setIsTyping] = useState(false)
	const lastTimeTyping = useRef(Date.now())
	useEffect(() => {
		if (isTyping)
			onStartTyping()
		else {
			onEndTyping()
		}
	}, [isTyping])
	//each second
	useEffect(() => {
		setInterval(() => {
			if (Date.now() - lastTimeTyping.current > 900)
			setIsTyping(false)
		}, 200)
	}, [])

	return (
		<div className={styles.container}>
			<input
				className={styles.bar}
				type="text"
				id="name"
				name="name"
				required
				placeholder={
					isFor === "message"
						? "Taper votre message..."
						: "Taper votre nouveau nom..."
				}
				value={value}
				onChange={event => {
					setValue(event.target.value)
					setIsTyping(true)
					lastTimeTyping.current = Date.now()
				}}
			/>
			<button
				className={styles.button}
				type="submit"
				onClick={() => onSend(value)}
			>
				Envoyer
			</button>
		</div>
	)
}
