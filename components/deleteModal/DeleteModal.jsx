import { useState } from 'react'
import { deleteComment } from '../../api'

import ErrorPage from '../../views/errorPage/ErrorPage'

import styles from './DeleteModal.module.css'

function DeleteModal({ setShowDeleteModal, setArticleComments, setArticle, comment }) {

    const [ error, setError ] = useState(null)

    const closeModalHandler = () => {
        setShowDeleteModal(false)
    }

    const deleteHandler = () => {
        setArticleComments((currArticleComments) => {
            const updatedComments = currArticleComments.filter((currComment) => {
                return currComment.comment_id !== comment.comment_id
            })
            return updatedComments
        })
        setArticle((currArticle) => {
            return {...currArticle, comment_count: currArticle.comment_count - 1}
        })
        setShowDeleteModal(false)
        console.log(comment.comment_id)
        deleteComment(comment.comment_id)
    }

    if(error) return <ErrorPage />

    return (
        <>
            <div className={styles.backDrop} onClick={closeModalHandler}></div>
            <div className={styles.deleteModal}>
                <h4>Delete comment</h4>
                <p>Are you sure?</p>
                <div className={styles.buttonWrapper}>
                    <button onClick={closeModalHandler}>no</button>
                    <button onClick={deleteHandler}>yes</button>
                </div>
            </div>
        </>
    )
}

export default DeleteModal