import { useState } from 'react'
import { deleteArticle } from '../../api'

import ErrorPage from '../../views/errorPage/ErrorPage'

import styles from './DeleteModalArticle.module.css'

function DeleteModalArticle({ setShowDeleteModal, setArticleList, articleId }) {

    const [ error, setError ] = useState(null)

    const closeModalHandler = () => {
        setShowDeleteModal(false)
    }

    const deleteHandler = () => {
        setArticleList((currArticles) => {
            const filteredArray = currArticles.filter((article) => {
                return article.article_id !== articleId
            })
            // console.log(filteredArray)
            return filteredArray
        })
        setShowDeleteModal(false)
        console.log(articleId)
        deleteArticle(articleId)
    }

    if(error) return <ErrorPage />

    return (
        <>
            <div className={styles.backDrop} onClick={closeModalHandler}></div>
            <div className={styles.deleteModal}>
                <h4>Delete Article!</h4>
                <p>Are you sure?</p>
                <div className={styles.buttonWrapper}>
                    <button onClick={closeModalHandler}>no</button>
                    <button onClick={deleteHandler}>yes</button>
                </div>
            </div>
        </>
    )
}

export default DeleteModalArticle