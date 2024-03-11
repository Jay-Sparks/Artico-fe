import axios from "axios";

const articoApi = axios.create({
    baseURL: "https://artico-dasj.onrender.com/api",
});

export const getAllArticles = ({sortBy, topic}) => {
    return articoApi
        .get(`/articles`, { params: { sort_by: sortBy, topic: topic }})
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