import { Link, useSearchParams } from 'react-router-dom';
import moment from 'moment'

import styles from './SingleTopic.module.css'
import { getAllArticles } from '../../api';
import { useEffect, useState } from 'react';

function SingleTopic() {
  const [ articleList, setArticleList ] = useState([])
  const [ searchParams, setSearchParams] = useSearchParams()
  const [ sortedBy, setSortedBy ] = useState("votes")
  const [ orderBy, setOrderBy ] = useState("desc")
  
  const topic = searchParams.get("topic")

  useEffect(() => {
    let params = {sortBy: sortedBy, order: orderBy}
    getAllArticles(params).then((response) => {
      console.log(params);
      console.log(response.articles);
      setArticleList(response.articles)
    })

  }, [sortedBy, orderBy])  

  const sortByHandler = (e) => [
    setSortedBy(e.target.value)
  ]

  const orderHandler = (e) => [
    setOrderBy(e.target.value)
  ]

  return (
    <div className={styles.topicWrapper}>
      <h2>{topic}</h2>
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
              <li key={article.article_id} className={styles.articleTile}>
                <div className={styles.articleInfo}>
                  <h4>{article.title}</h4>
                  <p className={styles.topic}>{article.topic}</p>
                  <Link to={`/articles/${article.article_id}`}>
                      <img src={article.article_img_url}/>
                  </Link>
                  <div className={styles.authorDetails}>
                    <div className={styles.authorName}>
                      <h5>by {article.author}</h5>  
                      <p className={styles.date}>{moment(article.created_at).format('L')}</p>
                    </div>
                    {article.votes > 0 ? 
                      <p><span className={styles.positive}>+</span>{article.votes} </p>
                      : 
                      <p>{article.votes}</p>
                    }
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

export default SingleTopic