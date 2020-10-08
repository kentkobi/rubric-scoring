import axios from 'axios'
import tokenService from '../utils/token.js'
const baseURL = "/api/teams"

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */
const getAll = async () => {
    const response = await axios.get(baseURL)
    
    return response.data
}

const getByName = async (teamname) => {
    const response = await axios.get(baseURL + "/" + teamname)

    return response.data
}

const create = async (target) => {
    const token = tokenService.getToken()

    if (!token) {
        return new Promise(() => null)
    }
    
    const response = await axios.post(baseURL + "/", target, tokenService.getConfig())

    return response.data
}

const update = async (target) => {
    const token = tokenService.getToken()

    if (!token) {
        return new Promise(() => null)
    }

    const response = await axios.put(baseURL + "/" + target.name, target, tokenService.getConfig() )

    return response.data
}

const remove = async ({name}) => {
    const token = tokenService.getToken()

    if (!token) {
        return new Promise(() => null)
    }

    const response = await axios.delete(baseURL + "/" + {name}, null, tokenService.getConfig() )

    return response.data
}

export default {getAll, getByName, create, update, remove} 