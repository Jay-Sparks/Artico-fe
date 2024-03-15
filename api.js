import axios from "axios";

const articoApi = axios.create({
    baseURL: "https://artico-dasj.onrender.com/api",
});

export const getAllArticles = ({sortBy, order, topic}) => {
    let params = { sort_by: sortBy, order: order, topic: topic}
    if(!topic) params = { sort_by: sortBy, order: order }
    return articoApi
        .get(`/articles`, { params: params })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getAllUsers = () => {
    return articoApi
        .get(`/users`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getUserByUsername = (userName) => {
    return articoApi
        .get(`/users/${userName}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getTopics = () => {
    return articoApi
        .get(`/topics`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getUserLogin = (userName) => {
    return articoApi
        .get(`/users/${userName}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}


export const getArticleById = (article_id) => {
    return articoApi
        .get(`/articles/${article_id}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const updateArticleVote = (inc_votes, articleId) => {
    return articoApi
        .patch(`/articles/${articleId}`, {
            inc_votes: inc_votes,
            article_id: articleId
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getArticleComments = (articleId) => {
    return articoApi
        .get(`/articles/${articleId}/comments`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const postNewComment = (articleId, comment) => {
    const params = {
        body: comment.body,
        username: comment.author
    }
    return articoApi
        .post(`/articles/${articleId}/comments`, params)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const updateCommentVote = (inc_votes, commentId) => {
    return articoApi
        .patch(`/comments/${commentId}`, {
            inc_votes: inc_votes,
            comment_id: commentId
        })
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deleteComment = (commentId) => {
    return articoApi
        .delete(`/comments/${commentId}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}

export const postNewArticle = (newArticle) => {
    return articoApi
        .post(`/articles`, newArticle)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            console.log(err);
        })
}