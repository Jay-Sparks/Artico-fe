import moment from 'moment'

import styles from './MiniArticle.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function MiniArticle({article}) {

  const [ viewFullCard, setViewFullCard ] = useState(false)

  const deleteHandler = () => {
    setShowDeleteModal(true)
    setDeleteComment(comment)
  }

  const viewFullHandler = () => {
    setViewFullCard((curr) => !curr)
  }

  return (
    <li className={styles.articleTile}>
          <h4>{article.title}</h4>
          <div className={styles.articleInfo}>
          <Link to={`/articles/${article.article_id}`}>
            <img src={article.article_img_url}/>
          </Link>
            <div className={styles.colFlex}>
              <div className={styles.authorDetails}>
                <div className={styles.authorName}>
                  <p className={styles.topic}>{article.topic}</p>
                  <p className={styles.date}>{moment(article.created_at).format('L')}</p>
                </div>
                {article.votes > 0 ? 
                  <p><span className={styles.positive}>+</span>{article.votes} </p>
                  : 
                  <p>{article.votes}</p>
                }
              </div>
              <div className={styles.authorDetails}>
                  <button className={styles.editButton}>
                      <img src="../../assets/editButton.svg" />
                  </button>
                  <button className={styles.deleteButton}>
                      <img src="../../assets/delete.svg" />
                  </button>
                  <Link to={`/articles/${article.article_id}`}>
                    <button className={styles.viewButton} >
                        <img src="../../assets/view.svg" />
                    </button>
                  </Link>
              </div>
            </div>
        </div>
      </li>
  )
}

export default MiniArticle