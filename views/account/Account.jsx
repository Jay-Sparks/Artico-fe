import { useContext, useState } from "react"
import UserContext from "../../contexts/User"
import { getUserLogin } from "../../api"

import ErrorPage from '../errorPage/ErrorPage'

import styles from './Account.module.css'

function Account() {
  const {loggedInUser, setLoggedInUser } = useContext(UserContext)
  const [ inputName, setInputName ] = useState("")
  const [ error, setError ] = useState(null)

  const logoutHandler = (e) => {
    e.preventDefault()
    setLoggedInUser({})
  }

  const loginHandler = (e) => {
    e.preventDefault()
    if(!inputName) alert("Whoops! No username provided")
    else getUserLogin(inputName)
      .then((data) => {
        setLoggedInUser(data.user)
      })
      .catch((err) => {
        setError({ err });
      })
  }

  const inputHandler = (e) => {
    setInputName(e.target.value);
  }

  if(error) return <ErrorPage message={error} />

  return (
    <>
      <section className={styles.accountView}>
        { loggedInUser.username ? 
            (
              <>
                <h2>Account</h2>
                <div className={styles.infoWrapper}>
                  <div className={styles.accountInfo}>
                    <p>Hi {loggedInUser.name}!</p>
                    <img src={loggedInUser.avatar_url}/>
                    <p>{loggedInUser.username}</p>
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
                      <div className={styles.testUserWrapper}>
                        <p>Test users: </p>
                        <p>grumpy19</p>
                        <p>tickle122</p>
                        <p>happyamy2016</p>
                        <p>jessjelly</p>
                        <p>coolmessy</p>
                        <p>weegembump</p>
                      </div>
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