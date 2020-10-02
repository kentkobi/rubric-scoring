require('dotenv').config()
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
    return authorization.substring(7)  
  }  
  return null
}

const validateToken = (req) => {
  const token = getTokenFrom(req)

  // if no token then we fail
  if (!token) {
    return null
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
   
  if (!decodedToken.id) {
    return null
  } else {
    return decodedToken
  }
}

module.exports = {getTokenFrom, validateToken}