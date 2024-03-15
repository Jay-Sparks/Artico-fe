import { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";

import { getAllArticles, getAllUsers, getTopics } from '../../api'

import UserContext from '../../contexts/User'
import ErrorPage from '../errorPage/ErrorPage';

import styles from './Home.module.css'
import Header from '../../components/header/Header';

function Home() {
    const { loggedInUser } = useContext(UserContext)
    const [ orderedArticles , setOrderedArticles ] = useState([])
    const [ topicList, setTopicList ] = useState([])
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        getAllArticles("created_at")
            .then((allArticles) => {
                const articles = allArticles.articles.slice(0,10)
                return articles
            })
            .then((articles) => {getAllUsers().then((response) => {
                const {users} = response
                const avatars = articles.map(({author}, index) => {
                    let avatarArticle = {}
                    users.forEach(({username, avatar_url}) => {
                        if(author === username) avatarArticle = {...articles[index], avatar_url: avatar_url}
                    })
                    return avatarArticle
                })
                setOrderedArticles(avatars)
                })
            })
            .catch((err) => {
                setError({ err })
            })


            getTopics()
                .then((topics) => {
                    return topics
                })
                .then(({topics}) => {
                    const topicPics = topics.map((topic) => {
                        const params = {sortBy: "votes", topic: topic.slug}
                        return getAllArticles(params)
                            .then(({articles}) => {
                                const topicArticle = articles[0]
                                return topicArticle
                            })
            })
            Promise.all(topicPics).then((topicImageList) => {
                setTopicList(topicImageList)
                setIsLoading(false)
            })
            .catch((err) => {
                setError({ err })
            })
        })
    },
    [])

    if (error) return <ErrorPage message={error}/>

    return (
        <div className={styles.homeWrapper}>
            <Header title={"Discover"}/>
            { isLoading ? 
                <p className={styles.isLoading}>fetching articles...</p>
                :
                <>
                    <h3>What's new today</h3>
                    <section className={styles.carousel}>
                        <ul className={styles.imageCarousel}>
                            {orderedArticles.map((article) => {
                                return (
                                    <li key={article.article_id} className={styles.carouselTile}>
                                            <Link to={`/articles/${article.article_id}`}>
                                                <div className={styles.imageContainer}> 
                                                    <img src={article.article_img_url} className={styles.carouselTileImage} />
                                                    <p className={styles.carouselTitle}>{article.title}</p>
                                                    <div className={styles.tileDetails}>
                                                        <img src={article.avatar_url}/>
                                                        <p className={styles.carouselAuthor}>@{article.author}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                    <h3>Browse topics</h3>
                    <section className={styles.topics}>
                        <ul className={styles.topicWrapper}>
                            {topicList.map((topic) => {
                                return (
                                    <Link to={`/articles?topic=${topic.topic}`} key={topic.article_id}>
                                        <li  className={styles.topicTile}>
                                            <img src={topic.article_img_url}/>
                                            <div className={styles.overlayBackground}></div>
                                            <p className={styles.overlayText}>{topic.topic}</p>
                                        </li>
                                    </Link>
                                )
                            })}
                        </ul>
                    </section>
                </>
            }
        </div>
    )
}

export default Home