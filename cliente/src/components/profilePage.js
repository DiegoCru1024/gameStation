import Header from "./headerComponent";
import styles from "../css/profile.module.css"
import defaultIMG from '../img/profile.jpg'
import {paste} from "@testing-library/user-event/dist/paste";

export default function ProfilePage() {
    const userData = localStorage.getItem('user')
    const parsedUser = JSON.parse(userData)

    return (
        <main>
            <Header/>
            <div className={styles.profileContainer}>
                <div className={styles.profileColumns}>
                    <div className={styles.profileHeader}>
                        <img alt='profileIMG' src={defaultIMG}></img>
                        <div>
                            <h2>{parsedUser.displayname}</h2>
                            <p>{parsedUser.description || 'No hay una descripción.'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}