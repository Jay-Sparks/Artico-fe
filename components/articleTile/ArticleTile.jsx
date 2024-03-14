import moment from 'moment'

import styles from './ArticleTile.module.css'
import { Link } from 'react-router-dom'

function ArticleTile({article}) {
  return (
    <li className={styles.articleTile}>
      <div className={styles.articleInfo}>
        <h4>{article.title}</h4>
        <p className={styles.topic}>{article.topic}</p>
        <Link to={`/articles/${article.article_id}`}>
            <img src={article.article_img_url}/>
        </Link>
        <div className={styles.authorDetails}>
          <div className={styles.authorName}>
            <h5>by {article.author}</h5>  
            <p className={styles.date}>{moment(article.created_at).format('L')}</p>
          </div>
          {article.votes > 0 ? 
            <p><span className={styles.positive}>+</span>{article.votes} </p>
            : 
            <p>{article.votes}</p>
          }
        </div>
      </div>
    </li>
  )
}

export default ArticleTile