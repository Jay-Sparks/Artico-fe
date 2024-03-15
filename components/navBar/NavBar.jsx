import { Link } from "react-router-dom";
import homeImage from '../src/assets/Home.svg'

import styles from './NavBar.module.css'


function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.link}>
        <img src={homeImage} />
      </Link>
      <Link to="/explore" className={styles.link}>
        <img src="../src/assets/Explore.svg" />
      </Link>
      <Link to="/publish" className={styles.linkPublish}>
        <img src="../src/assets/openBookPen.svg" />
      </Link>
      <Link to="/account" className={styles.link}>
        <img src="../src/assets/Account.svg" />
      </Link>
    </nav>
  )
}

export default NavBar