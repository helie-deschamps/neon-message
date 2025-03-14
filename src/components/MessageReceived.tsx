import styles from "../styles/MessageReceveid.module.css"

export default function Messagereceveid({time, text}: {time: string, text: string}) {
	return (
		<div className={styles.container}>
			<div className={styles.messageReceived}>{text}</div>
			<p className={styles.time}>{time}</p>
		</div>
	)
}
