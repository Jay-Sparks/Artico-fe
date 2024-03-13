import { useContext, useState } from "react"
import UserContext from "../../contexts/User"
import styles from './Account.module.css'
import { getUserLogin } from "../../api"

function Account() {
  const {loggedInUser, setLoggedInUser } = useContext(UserContext)
  const [ inputName, setInputName ] = useState("")

  const logoutHandler = (e) => {
    e.preventDefault()
    setLoggedInUser({})
  }

  const loginHandler = (e) => {
    e.preventDefault()
    if(!inputName) alert("Whoops! No username provided")
    else getUserLogin(inputName).then((data) => {
      if(data.status === 404) alert("User Not Found!")
      else if(data.status === 400) alert("Bad Request!")
      else setLoggedInUser(data.user)
    })
  }

  const inputHandler = (e) => {
    setInputName(e.target.value);
  }

  return (
    <>
      <section className={styles.accountView}>
        { loggedInUser.username ? 
            (
              <>
                <h2>Account</h2>
                <div className={styles.infoWrapper}>
                  <div className={styles.accountInfo}>
                    <img src={loggedInUser.avatar_url}/>
                    <p>{loggedInUser.username}</p>
                    <p>{loggedInUser.name}</p>
                  </div>
                  <button onClick={logoutHandler}>logout</button>
                </div>
              </>
            ):(
              <>
                <h2>Login</h2>
                <div className={styles.accountInfo}>
                  <form className={styles.userLogin}>
                    <input
                      type="text"
                      placeholder="Enter Username"
                      onChange={inputHandler}
                    />
                    <p>Test user: grumpy19</p>
                  <button onClick={loginHandler}>login</button>
                  </form>
                </div>
              </>
            )
        }
        </section>
    </>
  )
}

export default Account