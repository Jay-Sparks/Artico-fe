import { useParams } from "react-router-dom"
import { getAllUsers, getArticleById, getArticleComments, updateArticleVote } from "../../api"
import { useEffect, useState } from "react"

import moment from 'moment'

import styles from './SingleArticle.module.css'

import Comment from "../../components/comment/Comment"

function SingleArticle() {
  const { article_id } = useParams()
  const [ article, setArticle ] = useState({})
  const [ viewComments, setViewComments ] = useState(false)
  const [ articleComments, setArticleComments ] = useState([])

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.article)
      })

    getArticleComments(article_id)
      .then((response) => {
        const comments = response.comments
        return comments
      })
      .then((comments) => {
        getAllUsers()
          .then((res) => {
            const mappedComments = comments.map((comment) => {
              let commentCopy = {...comment}
              res.users.forEach((user) =>{
                if(user.username === comment.author) {
                  commentCopy = {...commentCopy, avatar_url: user.avatar_url}
                }
              })
              return commentCopy
            })
            setArticleComments(mappedComments)
          })
      })
      
    
  }, [])

  const upVoteHandler = () => {
    setArticle((currArticle) => {
      return {...currArticle, votes: currArticle.votes + 1}
    })
    updateArticleVote(1, article.article_id)
  }

  const downVoteHandler = () => {
    setArticle((currArticle) => {
      return {...currArticle, votes: currArticle.votes - 1}
    })
    updateArticleVote(-1, article.article_id)
  }

  const viewCommentsHandler = () => {
    setViewComments((curr) => !curr)
  }

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
          <button className={styles.downButton} onClick={downVoteHandler}>-</button>
          <button onClick={viewCommentsHandler}>
            { viewComments ? 
                <img src="../../assets/article.svg" className={styles.commentLogo} />
              :(
                <>
                  <img src="../../assets/commentBubble.svg" className={styles.commentLogo} />
                  <div className={styles.commentCount}>{article.comment_count}</div>
                </>
              )
            }
          </button>
          <button className={styles.upButton} onClick={upVoteHandler}>+</button>
        </div>
        <section className={styles.commentSection}>
          { viewComments ?
              articleComments.map((comment) => {
                return <Comment key={comment.comment_id} comment={comment}/>
              })
              :
              <p className={styles.articleBody}>{article.body}</p>
          }
        </section>
      </div>
    </>
  )
}

export default SingleArticle