import { useContext, useEffect, useState } from "react"
import { getAllArticles } from "../../api"
import UserContext from "../../contexts/User"

import ArticleTile from '../../components/articleTile/ArticleTile'

import styles from './Publish.module.css'

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
        console.log(userArticles);
        setArticleList(userArticles)
      })
  }, [])

  return (
    <div className={styles.publishWrapper}>
      <h2>My articles</h2>
      {articleList.map((article) => {
        return <ArticleTile key={article.article_id} article={article} />
      })}
    </div>
  )
}

export default Publish