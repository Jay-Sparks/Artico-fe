// import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from './NavBar.module.css'

import UserContext from "../../contexts/User";

function NavBar() {
  // const { loggedInUser } = useContext(UserContext)
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.link}>Home</Link>
      <Link to="/explore" className={styles.link}>Explore</Link>
      <Link to="/publish" className={styles.link}>Publish</Link>
      <Link to="/comments" className={styles.link}>Comments</Link>
      <Link to="/account" className={styles.link}>Account</Link>
    </nav>
  )
}

export default NavBar