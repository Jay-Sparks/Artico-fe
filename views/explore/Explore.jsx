import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { getAllArticles, getTopics } from "../../api"
import UserContext from "../../contexts/User"

import ArticleTile from '../../components/articleTile/ArticleTile'

import styles from './Explore.module.css'


function Explore() {
  const { loggedInUser } = useContext(UserContext)
  const [ articleList, setArticleList ] = useState([])
  const [ topicList, setTopicList ] = useState([])
  const [ sortedBy, setSortedBy ] = useState("created_at")
  const [ orderBy, setOrderBy ] = useState("asc")


  useEffect(() => {
    let params = {sortBy: sortedBy, order: orderBy}
    getAllArticles(params).then((response) => {
      setArticleList(response.articles)
    })

    getTopics().then((response) => {
      setTopicList(response.topics)
    })

  }, [orderBy, sortedBy])
  
  const sortByHandler = (e) => {
    setSortedBy(e.target.value)
  }
  
  const orderHandler = (e) => {
    setOrderBy(e.target.value)
  }

  return (
    <div className={styles.exploreWrapper}>
      <div className={styles.titleWrapper}>
          <h2>Explore</h2>
          {loggedInUser.username ?
            <div className={styles.userWrapper}>
                <p>{`${loggedInUser.username}`}</p>
                <img src={loggedInUser.avatar_url} className={styles.userAvatar}/>
            </div>
          :
            <Link to={`/account`}>
                <button>login</button>
            </Link>
          }
      </div>
      {topicList.map((topic, index) => {
        return <Link key={index} to={`/articles?topic=${topic.slug}`} className={styles.topicSelect}>
          <button>{topic.slug}</button>
        </Link>
      })}
      <h3>RESULTS</h3>
      <div className={styles.filters}>
        <select name="sortBy" id="sortBy" onChange={sortByHandler} value={sortedBy}>
          <option value="created_at">date</option>
          <option value="title">title</option>
          <option value="author">author</option>
          <option value="votes">votes</option>
        </select>
        <select name="order" id="order" onChange={orderHandler} value={orderBy}>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
      <section className={styles.articles}>
        <ul className={styles.articleWrapper}>
          {articleList.map((article) => {
            return <ArticleTile key={article.article_id} article={article} />
          })}
        </ul>
      </section>
    </div>
  )
}

export default Explore