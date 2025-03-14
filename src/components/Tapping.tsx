import styles from "../styles/Tapping.module.css"

export default function Tapping({usersTyping}: {usersTyping: string[]}) {
	return (
		<>
			<div className={styles.container}>
				{usersTyping.length === 0 ? "" : usersTyping.join(", ") + (usersTyping.length > 1 ? " sont en train d’écrire..." : " est en train d’écrire...")}
			</div>
		</>
	)
}
