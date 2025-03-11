import styles from "../styles/InputBar.module.css"

export default function InputBar() {
	return (
		<div className={styles.container}>
			<input
				className={styles.bar}
				type="text"
				id="name"
				name="name"
				required
				placeholder="Taper votre message..."
			/>
			<button className={styles.button} type="submit">
				Envoyer
			</button>
		</div>
	)
}
