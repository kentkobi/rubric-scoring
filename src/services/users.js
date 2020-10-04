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

const login = async ({username, password}) => {
    const response = await axios.post(baseURL + '/login', {username, password})
    window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
    tokenService.setToken(response.data.token)

    return response.data
}

const register = async ({name, company, username, password}) => {
    const response = await axios.post(baseURL + '/register', {name, company, username, password})
    window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
    tokenService.setToken(response.data.token)

    return response.data
}

const update = async (target) => {
    const token = tokenService.getToken()

    if (!token) {
        return new Promise(() => null)
    }

    const response = await axios.put(baseURL + "/" + target.username, target, tokenService.getConfig() )
    window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
    tokenService.setToken(response.data.token)

    return response.data
}

const edit = async (target) => {
    const token = tokenService.getToken()

    if (!token) {
        return new Promise(() => null)
    }

    const response = await axios.put(baseURL + "/" + target.username + "/profile", target, tokenService.getConfig() )
    window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
    tokenService.setToken(response.data.token)

    return response.data
}

const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    tokenService.setToken(null)
}

export default {getAll, getByUsername, login, register, edit, update, logout} 