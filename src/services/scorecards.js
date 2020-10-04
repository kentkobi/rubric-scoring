import axios from 'axios'
import tokenService from '../utils/token.js'
const baseURL = "/api/scorecards"

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */
const getByCompany = (company) => {
    return axios.get(baseURL + "/company/" + company)
                .then(response => response.data)
}

const addRubric = (scorecard, rubric) => {
    const token = tokenService.getToken()

    if (!token) {
        console.log("no token!")
        return new Promise(() => null)
    }

    return axios.put(baseURL + "/" + scorecard.id + "/rubric", rubric, tokenService.getConfig())
                .then(response => response.data)
}

const addCriteria = (scorecard, rubric, criteria) => {
    const token = tokenService.getToken()

    if (!token) {
        console.log("no token!")
        return new Promise(() => null)
    }

    return axios.put(baseURL + "/" + scorecard.id + "/" + rubric, criteria, tokenService.getConfig())
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

export default {getByCompany, addRubric, addCriteria, getAll, create, update, delete: del} 