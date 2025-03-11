import styles from "../styles/UserConnected.module.css"

export default function UserConnected() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Neon Message</h1>
			<h2 className={styles.subtitle}>Membres en lignes</h2>
			<p className={styles.user}>Marine est connecté.e</p>
			<p className={styles.user}>Helie est connecté.e</p>
		</div>
	)
}
