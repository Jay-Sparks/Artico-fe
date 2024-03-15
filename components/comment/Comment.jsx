import { useContext, useState } from 'react';
import UserContext from '../../contexts/User'
import moment from 'moment'

import styles from './Comment.module.css'

import editIcon from "../../src/assets/editButton.svg"
import deleteIcon from "../../src/assets/delete.svg"

import { deleteComment, updateCommentVote } from '../../api';

function Comment({ comment, setArticleComments, setArticle, setShowDeleteModal, setDeleteComment }) {

    const { loggedInUser } = useContext(UserContext)
    const [ viewFullCard, setViewFullCard ] = useState(false)
    
    const upVoteHandler = () => {
        setArticleComments((currArticleComments) => {
            const updatedComments = currArticleComments.map((currComment) => {
                if(currComment.comment_id === comment.comment_id) return {...currComment, votes: currComment.votes + 1}
                else return currComment
            })
            return updatedComments
        })
        updateCommentVote(1, comment.comment_id)
    }

    const downVoteHandler = () => {
        setArticleComments((currArticleComments) => {
            const updatedComments = currArticleComments.map((currComment) => {
                if(currComment.comment_id === comment.comment_id) return {...currComment, votes: currComment.votes - 1}
                else return currComment
            })
            return updatedComments
        })
        updateCommentVote(-1, comment.comment_id)
    }

    const deleteHandler = () => {
        setShowDeleteModal(true)
        setDeleteComment(comment)
    }

    const viewFullHandler = () => {
        setViewFullCard((curr) => !curr)
    }
    
    return (
        <div className={styles.commentWrapper}>
            <div>
                <img src={comment.avatar_url}/>
            </div>
            <div className={styles.commentMain}>
                <p className={styles.commentAuthor}>{comment.author}</p>
                {viewFullCard ? 
                    <>
                        <div className={styles.commentBody} onClick={viewFullHandler}>
                            <p>{comment.body}</p>
                        </div>
                        {loggedInUser.username === comment.author ?
                            <div className={styles.optionsWrapper}>
                                <p className={styles.commentDate}>{moment(comment.created_at).format('L')}</p>
                                <button className={styles.editButton}>
                                    <img src={editIcon} />
                                </button>
                                <button className={styles.deleteButton} onClick={deleteHandler}>
                                    <img src={deleteIcon} />
                                </button>
                            </div>
                            :
                            <p className={styles.commentDate}>{moment(comment.created_at).format('L')}</p>
                        }
                    </>
                    :
                    <>
                        <p className={styles.commentBody} onClick={viewFullHandler}>
                            {comment.body.length > 55 ? 
                                comment.body.substring(0, 55) + "..."
                                :
                                comment.body.substring(0, 55)
                            }
                        </p>
                        <p className={styles.commentDate}>{moment(comment.created_at).format('L')}</p>
                    </>
                }
            </div>
            <div className={styles.voteWrapper}>
                <button onClick={upVoteHandler}>+</button>
                <p>{comment.votes}</p>
                <button onClick={downVoteHandler}>-</button>
            </div>
        </div>
    )
}

export default Comment