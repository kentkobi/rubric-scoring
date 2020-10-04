require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/login', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({error: 'invalid username or password'})
  }

  const userForToken = {
    username: user.username,
    company: user.company,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({
      token,
      id: user.id, 
      username: user.username, 
      company: user.company,
      name: user.name})
})

usersRouter.post('/register', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    company: user.company,
    passwordHash,
  })

  try {
    const savedUser = await user.save()

    const userForToken = {
      username: user.username,
      company: user.company,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response
      .status(200)
      .send({
        token,
        id: savedUser.id, 
        username: savedUser.username, 
        company: user.company,
        name: savedUser.name})
  } 
  catch (error) {
    return response.status(500).send({error: error.message})
  }
})

usersRouter.get('/:username', async (request, response) => {
  const user = await User.findOne({username: request.params.username})

  response.json({
    id: user.id,
    username: user.username, 
    name: user.name})
})

usersRouter.put('/:username/profile', async (request, response) => {
  const body = request.body
  const token = tokenUtil.validateToken(request)

  if (!token) {
    return response.status(401).json({error: "invalid token"})
  }

  const currentUser = await User.findOne({username: request.params.username})

  //get new password hash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if (token.passwordHash === passwordHash) {
    return response.status(401).json({error: "invalid user"})
  }

  try{
    currentUser.name = body.name
    currentUser.passwordHash = passwordHash
    const savedUser = await currentUser.save()

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response
      .status(200)
      .send({
        token,
        id: savedUser.id, 
        username: savedUser.username, 
        comany: savedUser.company, 
        name: savedUser.name})
  } 
  catch (error) {
    return response.status(500).send({error: error.message})
  }
})
  
module.exports = usersRouter