import { useContext, useEffect, useState } from "react"
import { getAllArticles } from "../../api"
import UserContext from "../../contexts/User"

import MiniArticle from '../../components/miniArticle/MiniArticle'
import DeleteModalArticle from '../../components/deleteModalArticle/DeleteModalArticle'

import styles from './Publish.module.css'
import Header from "../../components/header/Header"
import { Link } from "react-router-dom"

function Publish() {
  const { loggedInUser } = useContext(UserContext)
  const [ articleList, setArticleList ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ deleteArticle, setDeleteArticle ] = useState(0)

  useEffect(() => {
    let params = { sortBy: "created_at", order: "asc" }
    getAllArticles(params)
      .then(({articles}) => {
        const userArticles = articles.filter((article) => {
          return article.author === loggedInUser.username
        })
        setIsLoading(false)
        setArticleList(userArticles)
      })
  }, [])

  return (
    <div className={styles.publishWrapper}>
      <Header title={"Publish"}/>
      {loggedInUser.username ?
        <>
          { showDeleteModal ? 
          <DeleteModalArticle 
            setArticleList={setArticleList} 
            articleId={deleteArticle.article_id} 
            setShowDeleteModal={setShowDeleteModal} 
          /> : null }
          <h3>My articles</h3>
          { isLoading ? 
            <p className={styles.isLoading}>fetching articles...</p>
            :
            <div className={styles.articleListWrapper}>
              {articleList.map((article) => {
                return <MiniArticle 
                  key={article.article_id} 
                  article={article} 
                  setShowDeleteModal={setShowDeleteModal} 
                  setDeleteArticle={setDeleteArticle} 
                />
              })}
            </div>
            }
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