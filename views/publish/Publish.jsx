import { useContext, useEffect, useState } from "react"
import { getAllArticles } from "../../api"
import UserContext from "../../contexts/User"

import MiniArticle from '../../components/miniArticle/MiniArticle'

import styles from './Publish.module.css'
import Header from "../../components/header/Header"
import { Link } from "react-router-dom"

function Publish() {
  const { loggedInUser } = useContext(UserContext)
  const [ articleList, setArticleList ] = useState([])

  useEffect(() => {
    let params = { sortBy: "created_at", order: "asc" }
    getAllArticles(params)
      .then(({articles}) => {
        const userArticles = articles.filter((article) => {
          return article.author === loggedInUser.username
        })
        setArticleList(userArticles)
      })
  }, [])

  return (
    <div className={styles.publishWrapper}>
      <Header title={"Publish"}/>
      {loggedInUser.username ? 
        <>
          <h3>My articles</h3>
          <div className={styles.articleListWrapper}>
            {articleList.map((article) => {
              return <MiniArticle key={article.article_id} article={article} />
            })}
          </div>
          <div className={styles.newArticle}>
            <Link to={"/publish/new"}>
              <button>write new article</button>
            </Link>
          </div>
        </>
        :
          <p className={styles.notLoggedIn}>Login to publish your own articles</p>
      }
    </div>
  )
}

export default Publish