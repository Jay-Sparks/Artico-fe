import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import styles from './SingleTopic.module.css'
import { getAllArticles, getTopics } from '../../api';

import ArticleTile from '../../components/articleTile/ArticleTile';
import UserContext from '../../contexts/User';

function SingleTopic() {

  const { loggedInUser } = useContext(UserContext)
  
  const [ articleList, setArticleList ] = useState([])
  const [ searchParams, setSearchParams] = useSearchParams()
  const [ sortedBy, setSortedBy ] = useState("votes")
  const [ orderBy, setOrderBy ] = useState("desc")
  const [ topicList, setTopicList ] = useState([])

  
  const topic = searchParams.get("topic")

  useEffect(() => {
    let params = {sortBy: sortedBy, order: orderBy, topic: topic}
    getAllArticles(params).then((response) => {
      console.log(response);
      setArticleList(response.articles)
    })

    getTopics().then((response) => {
      setTopicList(response.topics)
    })

  }, [sortedBy, orderBy, topic])  

  const sortByHandler = (e) => {
    setSortedBy(e.target.value)
  }

  const orderHandler = (e) => {
    setOrderBy(e.target.value)
  }
  
  const topicHandler = (newTopic) => {
    const newParams = new URLSearchParams(searchParams)
    console.log(newParams);
    newParams.set('topic', newTopic)
    setSearchParams(newParams)
  }

  return (
    <div className={styles.topicWrapper}>
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
          <button onClick={() => topicHandler(topic.slug)} value={topic.slug}>{topic.slug}</button>
        </Link>
      })}
      <h3>RESULTS</h3>
      <div className={styles.filters}>
        <select name="sortBy" id="sortBy" onChange={sortByHandler} value={sortedBy}>
          <option className="option" value="created_at">date</option>
          <option value="title">title</option>
          <option value="author">author</option>
          <option value="votes">votes</option>
        </select>
        <select name="order" id="order" onChange={orderHandler} value={orderBy}>
          <option value="asc" >ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>
      <section className={styles.articles}>
        <ul className={styles.articleWrapper}>
          {articleList.map((article) => {
            return (
              <ArticleTile article={article} key={article.article_id} />
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default SingleTopic