require('dotenv').config()

const axios = require("axios");
const usersRouter = require('express').Router()

let getAccessToken = async (req, res, next) => {
  const body = {
    "client_id": process.env.REACT_APP_AUTH0_MGMT_CLIENT_ID,
    "client_secret": process.env.REACT_APP_AUTH0_MGMT_CLIENT_SECRET,
    "audience":`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
    "grant_type":"client_credentials"
  }
  const response = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, body)

  req.auth0AccessToken = response.data.access_token
  return next();
}

usersRouter.get('/', getAccessToken, async (request, response) => {
  const token = request.auth0AccessToken
  const config = {headers: { Authorization: `Bearer ${token}` }};

  const users = await axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users?fields=user_id,email,name,last_login,picture,user_metadata&include_fields=true`, config)

  response.json(users.data)
})

usersRouter.put('/:user_id', getAccessToken, async (request, response) => {
  const token = request.auth0AccessToken
  const config = {headers: { Authorization: `Bearer ${token}` }};
  const user_metadata = { "user_metadata" : { "assigned": request.body.group } }
  const users = await axios.patch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${request.params.user_id}`, user_metadata, config)

  response.json(users.data)
})

module.exports = usersRouter