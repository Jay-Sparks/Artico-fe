import { useContext, useEffect, useState } from "react"
import Header from "../../components/header/Header"
import UserContext from "../../contexts/User"
import styles from './NewArticle.module.css'
import { getTopics, postNewArticle } from "../../api"
import ErrorPage from '../errorPage/ErrorPage'

function NewArticle() {

  const { loggedInUser } = useContext(UserContext)
  const [ topicList, setTopicList ] = useState([])
  const [ existingTopic, setExistingTopic ] = useState("")
  const [ newTopic, setNewTopic ] = useState("")
  const [ coverImg, setCoverImg ] = useState("")
  const [ newTitle, setNewTitle ] = useState("")
  const [ newCoverImg, setNewCoverImg ] = useState("https://placehold.co/300x200?text=Add a cover image")
  const [ newBody, setNewBody ] = useState("")
  const [ error, setError ] = useState(null)


  useEffect(() => {
    getTopics().then((response) => {
      setTopicList(response.topics)
    })
    .catch((err) => {
      setError({ err });
    })
  }, [])


  const existingTopicHandler = (e) => {
    setExistingTopic(e.target.value)
    setNewTopic(e.target.value)
  }

  const addImageHandler = (e) => {
    e.preventDefault()
    console.log("CLICKED");
    setNewCoverImg(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const newArticle = {
      title: newTitle,
      topic: newTopic,
      author: loggedInUser.username,
      article_img_url: newCoverImg,
      body: newBody
    }
    postNewArticle(newArticle)
      .then(({article}) => {
        alert(article.title + " has been published")
        setNewTopic("")
        setNewTitle("")
        setNewCoverImg("https://placehold.co/300x200?text=Add a cover image")
        setNewBody("")
      })
      .catch((err) => {
        setError({ err });
      })
  }

  if(error) return <ErrorPage message={error} />

  return (
    <div className={styles.newArticle}>
      <Header title={"New article"}/>
      <div className={styles.inputWrapper}>
      <form id="articleForm" onSubmit={submitHandler} className={styles.articleInput}>
          <p>Choose a topic:</p>
          <div className={styles.topicWrapper}>
            {/* <input type="text" placeholder="Topic" onChange={(e) => setNewTopic(e.target.value)} value={newTopic} /> */}
            <select name="" id="" value={existingTopic} onChange={existingTopicHandler}>
              {topicList.map((topic, index) => {
                return <option key={index} value={topic.slug}>{topic.slug}</option>
              })}
            </select>
          </div>

          <img src={newCoverImg} />
          <div className={styles.topicWrapper}>

            <input className={styles.imgInput} type="text" placeholder="Cover image" onChange={(e) => setCoverImg(e.target.value)} value={coverImg}/>
            <button type="click" onClick={addImageHandler} value={coverImg} className={styles.addButton}>add image</button>
          </div>
          <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
          <textarea name="" id="" cols="30" rows="10" value={newBody} onChange={(e) => setNewBody(e.target.value)} placeholder="Your article..."></textarea>
          <button type="submit" className={styles.publishButton}>Publish</button>
      </form>
      </div>
    </div>
  )
}

export default NewArticle