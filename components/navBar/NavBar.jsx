// import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from './NavBar.module.css'

import UserContext from "../../contexts/User";

function NavBar() {
  // const { loggedInUser } = useContext(UserContext)
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.link}>
        <img src="../../assets/Home.svg" />
      </Link>
      <Link to="/explore" className={styles.link}>
        <img src="../../assets/Explore.svg" />
      </Link>
      <Link to="/publish" className={styles.link}>Publish
      </Link>
      <Link to="/comments" className={styles.link}>
        <img src="../../assets/Comments.svg" />
      </Link>
      <Link to="/account" className={styles.link}>
        <img src="../../assets/Account.svg" />
      </Link>
    </nav>
  )
}

export default NavBar