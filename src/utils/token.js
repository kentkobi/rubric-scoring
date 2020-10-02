require('dotenv').config()
const jwt = require('jsonwebtoken')

const getToken = () => {
    return window.localStorage.getItem('token')
}

const setToken = (newToken) => {
  if (typeof newToken !== 'undefined') {
    window.localStorage.setItem('token', newToken)
  } else {
    console.log("an undefined token was attempted!")
  }
}

const getTokenFrom = request => {
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
    return authorization.substring(7)  
  }  
  return null
}

const validateToken = (request) => {
  const token = getTokenFrom(request)

  if (!token) {
    return null // if no token then we fail early
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
   
  if (!decodedToken.id) {
    setToken(null)
    return null
  } else {
    setToken(decodedToken)
    return decodedToken
  }
}

const getConfig = () => {
  return {headers: {Authorization: "Bearer " + getToken()}  }
}

export default {getToken, setToken, getConfig, getTokenFrom, validateToken}