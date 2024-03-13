import { useEffect, useState, useContext } from 'react'
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom";

import styles from './Home.module.css'

import { getAllArticles, getAllUsers, getTopics } from '../../api'

import UserContext from '../../contexts/User'
import SingleArticle from '../singleArticle/SingleArticle';

function Home() {
    const { loggedInUser } = useContext(UserContext)
    const [ orderedArticles , setOrderedArticles ] = useState([])
    const [ topicList, setTopicList ] = useState([])

    useEffect(() => {
        getAllArticles("created_at").then((allArticles) => {
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
        getTopics().then((topics) => {
            return topics
        }).then(({topics}) => {
            const topicPics = topics.map((topic) => {
                const params = {sortBy: "votes", topic: topic.slug}
                return getAllArticles(params).then(({articles}) => {
                    const topicArticle = articles[0]
                    return topicArticle
                })
            })
            Promise.all(topicPics).then((topicImageList) => {
                setTopicList(topicImageList)
            })
        })
    },
    [])


  return (
    <div className={styles.homeWrapper}>
        <div className={styles.titleWrapper}>
            <h2>Discover</h2>
            <div className={styles.userWrapper}>
                <p>{`${loggedInUser.username}`}</p>
                <img src={loggedInUser.avatar_url} className={styles.userAvatar}/>
            </div>
        </div>
        <h3>What's new today</h3>
        <section className={styles.carousel}>
            <ul className={styles.imageCarousel}>
                {orderedArticles.map((article) => {
                    return (
                        <li key={article.article_id} className={styles.carouselTile}>
                            <div className={styles.imageContainer}>
                                <Link to={`/articles/${article.article_id}`}>
                                    <img src={article.article_img_url} className={styles.carouselTileImage} />
                                    <p className={styles.overlayText}>{article.title}</p>
                                </Link>
                            </div>
                            <div className={styles.tileDetails}>
                                <img src={article.avatar_url}/>
                                <p className={styles.carouselAuthor}>@{article.author}</p>
                            </div>
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
                        <li key={topic.article_id} className={styles.topicTile}>
                            <img src={topic.article_img_url}/>
                        </li>
                    )
                })}
            </ul>
        </section>
    </div>
  )
}

export default Home