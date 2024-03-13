import { useState } from 'react'
import { Routes, Route } from "react-router-dom"

import UserContext from '../contexts/User'

import Home from '../views/home/Home'
import Explore from '../views/explore/Explore'
import Publish from '../views/publish/Publish'
import Comments from '../views/comments/Comments'
import Account from '../views/account/Account'

import NavBar from '../components/navBar/NavBar'
import SingleArticle from '../views/singleArticle/SingleArticle'


function App() {

  const [ loggedInUser, setLoggedInUser ] = useState({
    "username": "grumpy19",
    "name": "robert grump",
    "avatar_url": "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
  })

  return (
    <UserContext.Provider value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/account" element={<Account />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
      <NavBar />
    </UserContext.Provider>
  )
}

export default App
