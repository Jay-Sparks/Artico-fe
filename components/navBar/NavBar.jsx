import { Link } from "react-router-dom";
import homeIcon from '../../src/assets/Home.svg'
import exploreIcon from '../../src/assets/Explore.svg'
import publishIcon from '../../src/assets/openBookPen.svg'
import accountIcon from '../../src/assets/Account.svg'

import styles from './NavBar.module.css'


function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.link}>
        <img src={homeIcon} />
      </Link>
      <Link to="/explore" className={styles.link}>
        <img src={exploreIcon} />
      </Link>
      <Link to="/publish" className={styles.linkPublish}>
        <img src={publishIcon} />
      </Link>
      <Link to="/account" className={styles.link}>
        <img src={accountIcon} />
      </Link>
    </nav>
  )
}

export default NavBar