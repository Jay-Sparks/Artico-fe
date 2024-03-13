import { useParams } from "react-router-dom"
import { getArticleById } from "../../api"
import { useEffect, useState } from "react"

import moment from 'moment'


import styles from './SingleArticle.module.css'

function SingleArticle() {
  const { article_id } = useParams()
  const [ article, setArticle ] = useState({})

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.article)
      })
  }, [])

  return (
    <>
      <div className={styles.articleWrapper}>
        <div className={styles.flexWrapper}>
          <p>{article.topic}</p>
          <p>{moment(article.created_at).format('L')}</p>
        </div>
        <h2 className={styles.articleTitle}>{article.title}</h2>
        <div className={styles.flexWrapper}>
          <p>{article.author}</p>
          <p>{article.votes}</p>
        </div>
        <img className={styles.articleImg} src={article.article_img_url} />

        <div className={styles.votingWrapper}>
          <button className={styles.downButton}>-</button>
          <button>
            <img src="../../assets/commentBubble.svg" className={styles.commentLogo} />
            <div className={styles.commentCount}>{article.comment_count}</div>
          </button>
          <button className={styles.upButton}>+</button>
        </div>
        <p className={styles.articleBody}>{article.body}</p>
      </div>
    </>
  )
}

export default SingleArticle