import styles from "../styles/InputBar.module.css"
import { useState } from "react"

export default function InputBar({
	isFor = "message",
	onSend = () => {},
}: {
	isFor?: "message" | "username"
	onSend?: (textInput: string) => void
}) {
	const [value, setValue] = useState<string>("")

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
				onChange={event => setValue(event.target.value)}
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
