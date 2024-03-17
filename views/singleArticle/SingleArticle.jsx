import { useParams } from "react-router-dom"
import { getAllUsers, getArticleById, getArticleComments, postNewComment, updateArticleVote } from "../../api"
import { useEffect, useState, useContext } from "react"

import UserContext from "../../contexts/User"

import moment from 'moment'

import styles from './SingleArticle.module.css'

import Comment from "../../components/comment/Comment"
import DeleteModal from "../../components/deleteModal/DeleteModal.jsx"
import Header from "../../components/header/Header.jsx"

import articleIcon from "../../src/assets/article.svg"
import commentIcon from "../../src/assets/commentBubble.svg"

function SingleArticle() {
  const { loggedInUser } = useContext(UserContext)
  const { article_id } = useParams()
  const [ article, setArticle ] = useState({})
  const [ viewComments, setViewComments ] = useState(false)
  const [ articleComments, setArticleComments ] = useState([])
  const [ newComment, setNewComment ] = useState("")
  const [ showDeleteModal, setShowDeleteModal ] = useState(false)
  const [ deleteComment, setDeleteComment ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.article)
        if(response.article.comment_count !== 0) {
          getArticleComments(article_id)
            .then((response) => {
              const comments = response.comments
              return comments
            })
            .then((comments) => {
              getAllUsers()
                .then(({users}) => {
                  const mappedComments = comments.map((comment) => {
                    let commentCopy = {...comment}
                    users.forEach((user) =>{
                      if(user.username === comment.author) {
                        commentCopy = {...commentCopy, avatar_url: user.avatar_url}
                      }
                    })
                    return commentCopy
                  })
                  setArticleComments(mappedComments)
                })
              })
            }
          })
          setIsLoading(false)
  }, [])

  const upVoteHandler = () => {
    if(loggedInUser.username === article.author) alert("You can't vote on your own articles!")
    else setArticle((currArticle) => {
        return {...currArticle, votes: currArticle.votes + 1}
      })
      updateArticleVote(1, article.article_id)
  } 

  const downVoteHandler = () => {
    {loggedInUser.username === article.author ? 
      alert("You can't vote on your own articles!")
      :
      setArticle((currArticle) => {
        return {...currArticle, votes: currArticle.votes - 1}
      })
      updateArticleVote(-1, article.article_id)
    }
  }

  const viewCommentsHandler = () => {
    setViewComments((curr) => !curr)
  }

  const newCommentHandler = (e) => {
    setNewComment(e.target.value)
  }

  const submitCommentHandler = (e) => {
    e.preventDefault()
    const commentBody = e.target[0].value
    if(!loggedInUser.username) alert("You must be logged in to post a comment")
    else if(!commentBody) alert("Whoops! You need to write your comment")
    else if(commentBody.length < 5) alert("Your comment does not meet the minimum length")
    else {
      const comment = {body: commentBody, author: loggedInUser.username}
      setArticleComments((currComments) => {
        const timeStamp = new Date(Date.now())
        setNewComment("")
        const newComment = {
          comment_id: Math.floor(Math.random() * 10000),
          body: commentBody,
          author: loggedInUser.username,
          avatar_url: loggedInUser.avatar_url,
          created_at: timeStamp.toISOString(),
          votes: 0
        }
        return [newComment, ...currComments]
      })
      postNewComment(article_id, comment)
    }
  }

  return (
    <>
      <div className={styles.articleWrapper}>
        <Header title={"Artico"}/>
        { isLoading ? 
            <p className={styles.isLoading}>fetching articles...</p>
            :
            <>
          <div className={styles.flexWrapper}>
            <p>{article.topic}</p>
            <p>{moment(article.created_at).format('L')}</p>
          </div>
          <h2 className={styles.articleTitle}>{article.title}</h2>
          <div className={styles.flexWrapper}>
            <p>by {article.author}</p>
            {article.votes > 0 ? 
              <p><span className={styles.positive}>+</span>{article.votes} </p>
              : 
              <p>{article.votes}</p>
            }
          </div>
          <img className={styles.articleImg} src={article.article_img_url} />
          <div className={styles.votingWrapper}>
            <button className={styles.downButton} onClick={downVoteHandler}>-</button>
            <button onClick={viewCommentsHandler}>
              {viewComments ? 
                  <img src={articleIcon} className={styles.articleLogo} />
                :
                  <>
                    <img src={commentIcon} className={styles.commentLogo} />
                    <div className={styles.commentCount}>{article.comment_count}</div>
                  </>
              }
            </button>
            <button className={styles.upButton} onClick={upVoteHandler}>+</button>
          </div>
          <section className={styles.commentSection}>
            { viewComments ? 
              <form onSubmit={submitCommentHandler} value="" className={styles.commentInput}>
                <textarea value={newComment} type="text" placeholder="Add a comment..." onChange={newCommentHandler}></textarea>
                <button>post</button>
              </form>
              : null
            }
            { viewComments ?
                (
                  articleComments.map((comment) => {
                    return  <Comment 
                              key={comment.comment_id} 
                              comment={comment} 
                              setArticleComments={setArticleComments} 
                              setArticle={setArticle} 
                              setShowDeleteModal={setShowDeleteModal}
                              setDeleteComment={setDeleteComment}
                            />
                  })
                )
                :
                <p className={styles.articleBody}>{article.body}</p>
            }
          </section>
          { showDeleteModal ? 
            <DeleteModal 
              setShowDeleteModal={setShowDeleteModal} 
              setArticleComments={setArticleComments}
              setArticle={setArticle}
              comment={deleteComment}
            /> 
          : null}
            </>
        }
      </div>
    </>
  )
}

export default SingleArticle