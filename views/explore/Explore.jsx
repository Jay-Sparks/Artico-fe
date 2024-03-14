import { useContext, useEffect, useState } from "react"
import moment from 'moment'

import UserContext from "../../contexts/User"

import styles from './Explore.module.css'

import { getAllArticles, getTopics } from "../../api"
import { Link } from "react-router-dom"

function Explore() {
  const { loggedInUser } = useContext(UserContext)
  const [ articleList, setArticleList ] = useState([])
  const [ topicList, setTopicList ] = useState([])
  const [ selectedTopic, setSelectedTopic ] = useState("")
  const [ sortedBy, setSortedBy ] = useState("")
  const [ orderBy, setOrderBy ] = useState("")

  useEffect(() => {
    let params = {sortBy: "created_at"}
    if(selectedTopic && !sortedBy) {
      params = {sortBy: "created_at", topic: selectedTopic}
    }
    else if(sortedBy && !selectedTopic){
      params = {sortBy: sortedBy, topic: ""}
    }
    else if(sortedBy && selectedTopic){
      params = {sortBy: sortedBy, topic: selectedTopic}
    }

    getAllArticles(params).then((response) => {
      setArticleList(response.articles)
    })

    getTopics().then((response) => {
      setTopicList(response.topics)
    })
  }, [selectedTopic, sortedBy])

  const topicHandler = (e) => {
    setSelectedTopic(e.target.value)
  }
  
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
      {/* <select name="topics" id="topics" onChange={topicHandler}>
        {topicList.map((topic, index) => {
          return <option key={index} value={topic.slug} >{topic.slug}</option>
        })}
      </select> */}
      <input type="text" placeholder="search articles" />
      <div>
      {topicList.map((topic, index) => {
        return <Link key={index} to={`/${topic.slug}`}>
          <button>{topic.slug}</button>
        </Link>
      })}
      </div>
      <h3>RESULTS</h3>
      <div className={styles.filters}>
        <select name="sortBy" id="sortBy" onChange={sortByHandler}>
          <option value="date">date</option>
          <option value="title">title</option>
          <option value="author">author</option>
          <option value="votes">votes</option>
        </select>
        <select name="order" id="order" onChange={orderHandler}>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
      <section className={styles.articles}>
        <ul className={styles.articleWrapper}>
          {articleList.map((article) => {
            return (
              <li key={article.article_id} className={styles.articleTile}>
                <div className={styles.articleInfo}>
                  <h4>{article.title}</h4>
                  <p className={styles.topic}>{article.topic}</p>
                  <Link to={`/articles/${article.article_id}`}>
                      <img src={article.article_img_url}/>
                  </Link>
                  <div className={styles.authorVotes}>
                    <h5>by {article.author}</h5>  
                    <p>{article.votes}</p>
                    <p className={styles.date}>{moment(article.created_at).format('L')}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default Explore