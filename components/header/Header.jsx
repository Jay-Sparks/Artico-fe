import { useContext } from "react"
import { Link } from "react-router-dom"

import UserContext from "../../contexts/User"

import styles from './Header.module.css'

function Header({ title }) {
    const { loggedInUser } = useContext(UserContext)

    return (
        <div className={styles.titleWrapper}>
            <h2>{title}</h2>
            {loggedInUser.username ?
            <div className={styles.userWrapper}>
                <p>{`${loggedInUser.username}`}</p>
                <img src={loggedInUser.avatar_url} className={styles.userAvatar}/>
            </div>
            :
            <Link to={`/account`}>
                <button>login</button>
            </Link>
            }
        </div>
    )
}

export default Header