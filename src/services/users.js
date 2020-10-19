import axios from 'axios'
import tokenService from '../utils/token.js'
const baseURL = "/api/users"

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */
const getAll = async () => {
    const response = await axios.get(baseURL)
    
    return response.data
}

const getByUsername = async (username) => {
    const response = await axios.get(baseURL + "/" + username)

    return response.data
}

const assignToGroup = async (user_id, group) => {

    const response = await axios.put(baseURL + "/" + user_id, {group} )

    return response.data
}

export default {getAll, getByUsername, assignToGroup} 