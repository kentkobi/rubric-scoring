require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')
const User = require('../models/user')
const Post = require('../models/post')

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
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({
      token,
      id: user.id, 
      username: user.username, 
      name: user.name, 
      avatar: user.avatar, 
      follows: user.follows,
      posts: user.posts, 
      followers: user.followers })
})

usersRouter.get('/suggested', async (request, response) => {
  const users = await User.aggregate([{ $sample: { size: 4 } }])

  var result = users.map((user) => {
    return {
      id: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      follows: user.follows,
      posts: user.posts
    }
  })

  response
    .status(200)
    .send(result)
})

usersRouter.post('/register', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    avatar: "http://robohash.org/" + body.username,
    passwordHash,
  })

  try {
    const savedUser = await user.save()

    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response
      .status(200)
      .send({
        token,
        id: savedUser.id, 
        username: savedUser.username, 
        name: savedUser.name, 
        avatar: savedUser.avatar, 
        follows: savedUser.follows,
        posts: savedUser.posts, 
        followers: savedUser.followers })
  } 
  catch (error) {
    return response.status(500).send({error: error.message})
  }
})

usersRouter.put('/:username', async (request, response) => {
  const followers = await User.countDocuments({follows: request.params.username})

  const newUser = {
    follows: request.body.follows,
    followers: followers
  }

  User.findOneAndUpdate({username: request.params.username}, newUser, {new: true, useFindAndModify: false})
    .then(result => {
        response.json(result)
    })
})

usersRouter.get('/:username', async (request, response) => {
  const user = await User.findOne({username: request.params.username})
  const posts = await Post.countDocuments({authorUsername: request.params.username});
  const followers = await User.countDocuments({follows: request.params.username})

  response.json({
    id: user.id,
    username: user.username, 
    name: user.name, 
    avatar: user.avatar,
    posts: posts, 
    follows: user.follows,
    followers: followers})
})

usersRouter.get('/:username/suggested', async (request, response) => {
  const user = await User.findOne({username: request.params.username})
  const filter = { username: {$nin: [user.username, ...user.follows]}}
  const users = await User.aggregate([
    { $match: filter },
    { $sample: { size: 4 } }])

  var result = users.map((user) => {
      return {
        id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        follows: user.follows,
        posts: user.posts
      }
    })

    response
      .status(200)
      .send(result)
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
    currentUser.avatar = body.avatar
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
        name: savedUser.name, 
        avatar: savedUser.avatar, 
        follows: savedUser.follows,
        posts: savedUser.posts, 
        followers: savedUser.followers })
  } 
  catch (error) {
    return response.status(500).send({error: error.message})
  }
})
  
module.exports = usersRouter