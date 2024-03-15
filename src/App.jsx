import { useState } from 'react'
import { Routes, Route } from "react-router-dom"

import UserContext from '../contexts/User'

import Home from '../views/home/Home'
import Explore from '../views/explore/Explore'
import Publish from '../views/publish/Publish'
import Account from '../views/account/Account'

import NavBar from '../components/navBar/NavBar'
import SingleArticle from '../views/singleArticle/SingleArticle'
import SingleTopic from '../views/singleTopic/SingleTopic'
import ErrorPage from '../views/errorPage/ErrorPage'
import NewArticle from '../views/newArticle/NewArticle'


function App() {
  const [ loggedInUser, setLoggedInUser ] = useState({})

  return (
    <UserContext.Provider value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/publish/new" element={<NewArticle />} />
        <Route path="/articles" element={<SingleTopic />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <NavBar />
    </UserContext.Provider>
  )
}

export default App
