import moment from 'moment'

import styles from './Comment.module.css'

function Comment({ comment }) {
  return (
    <div className={styles.commentWrapper}>
        <div>
            <img src={comment.avatar_url}/>
        </div>
        <div className={styles.commentMain}>

            <p className={styles.commentAuthor}>{comment.author}</p>
            <p className={styles.commentBody}>
                {comment.body.substring(0, 60) + "..."}
            </p>
            <p className={styles.commentDate}>{moment(comment.created_at).format('L')}</p>
        </div>
        <div className={styles.voteWrapper}>
            <button>+</button>
            <p>{comment.votes}</p>
            <button>-</button>
        </div>
    </div>
  )
}

export default Comment