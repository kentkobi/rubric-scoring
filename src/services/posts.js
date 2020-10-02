import axios from 'axios'
import tokenService from '../utils/token.js'
const baseURL = "/api/posts"

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */
const getByUsername = (username) => {
    return axios.get(baseURL + "/user/" + username)
                .then(response => response.data)
}

const getFollowedBy = (username) => {
    return axios.get(baseURL + "/user/" + username + "/follows")
                .then(response => response.data)
}

const getLikesBy = (username) => {
    return axios.get(baseURL + "/user/" + username + "/likes")
                .then(response => response.data)
}

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */
const getAll = () => {
    return axios.get(baseURL)
                .then(response => response.data)
}

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */
const getPopular = () => {
    return axios.get(baseURL + "/most/popular")
                .then(response => response.data)
}

/**
 * 
 * @param {Object} newObject a new unit object
 * @returns {Promise} Promise that will resolve to the response data
 */
const create = (newObject) => {
    const token = tokenService.getToken()

    if (!token) {
        console.log("no token!")
        return new Promise(() => null)
    }

    return axios.post(baseURL, newObject, tokenService.getConfig())
                .then(response => response.data)
}

/**
 * Update an existing unit via the API
 * @param {Object} unit An modified unit {code, title, offering}
 * @returns {Promise} Promise that will resolve to the response data
 */
const update = (unit) => {
    const token = tokenService.getToken()

    if (!token) {
        console.log("no token!")
        return new Promise(() => null)
    }

    return axios.put(baseURL + "/" + unit.id, unit, tokenService.getConfig())
                .then(response => response.data)
}

/**
 * Delete an existing unit via the API
 * @param {integer} unitid the unit id to delete
 * @returns {Promise} Promise that will resolve to the response data
 */
const del = (id) => {
    const token = tokenService.getToken()

    if (!token) {
        return new Promise(() => null)
    }

    return axios.delete(baseURL + "/" + id, tokenService.getConfig())
                .then(response => response.data)
}

export default {getByUsername, getFollowedBy, getLikesBy, getAll, getPopular, create, update, delete: del} 