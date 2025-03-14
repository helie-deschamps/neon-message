import styles from "../styles/UserConnected.module.css"

export default function UserConnected({usersList}: {usersList: {publicId:string, username: string | undefined}[]}) {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Neon Message</h1>
			<h2 className={styles.subtitle}>Membres en lignes</h2>
			{usersList.map((user, index) => (
				<p key={index} className={styles.user}>
					{user.username ?? "Utilisateur inconnu"} est connecté.e
				</p>
			))}
		</div>
	)
}
