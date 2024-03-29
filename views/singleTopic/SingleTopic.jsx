import { useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import styles from './SingleTopic.module.css'
import { getAllArticles, getTopics } from '../../api'

import ArticleTile from '../../components/articleTile/ArticleTile'
import UserContext from '../../contexts/User'
import Header from '../../components/header/Header'
import ErrorPage from '../errorPage/ErrorPage'

function SingleTopic() {

  const { loggedInUser } = useContext(UserContext)
  
  const [ articleList, setArticleList ] = useState([])
  const [ searchParams, setSearchParams] = useSearchParams()
  const [ sortedBy, setSortedBy ] = useState("votes")
  const [ orderBy, setOrderBy ] = useState("desc")
  const [ topicList, setTopicList ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ error, setError ] = useState(null)

  
  const topic = searchParams.get("topic")

  useEffect(() => {
    setIsLoading(true)
    let params = {sortBy: sortedBy, order: orderBy, topic: topic}
    getAllArticles(params).then((response) => {
      setArticleList(response.articles)
      setIsLoading(false)
    })
    .catch((err) => {
      setError({ err })
    })

    getTopics().then((response) => {
      setTopicList(response.topics)
    })
    .catch((err) => {
      setError({ err })
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

  if (error) return <ErrorPage message={error}/>

  return (
    <div className={styles.topicWrapper}>
      <Header title={"Explore"}/>
          <div className={styles.topicSelectWrapper}>
            {topicList.map((topic, index) => {
              return <Link key={index} to={`/articles?topic=${topic.slug}`} className={styles.topicSelect}>
                <button onClick={() => topicHandler(topic.slug)} value={topic.slug}>{topic.slug}</button>
              </Link>
            })}
          </div>
          {isLoading ? 
            <p className={styles.isLoading}>fetching articles...</p>
            :
            <>
              <h3>Results</h3>
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
        </>
      }
    </div>
  )
}

export default SingleTopic