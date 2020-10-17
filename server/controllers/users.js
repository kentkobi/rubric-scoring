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
    company: body.company,
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
        company: savedUser.company,
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
    name: user.name,
    company: user.company})
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

usersRouter.put('/forgot-password', async (request, response) => {
  const email = request.body

  User.findOne({username: email}, (err, user) => {
    if(err || !user){
      return response.status(400).json({error: "User with this email does not exist"})
    }

    const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: '20m'})
    const data = {
      from: 'noreply@univative.com',
      to: email,
      subject: 'Forgot Password Link',
      html:`
        <h3>Please click on the link to reset your password</h3>
        <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
      `
    }

    return user.updateOne({resetLink: token}, async (error, succcess) => {
      if (error){
        return response.status(400).json({error: "reset password link error"})
      } else {
        mg.messages.send(data, function(error, body){
          if(error){
            return response.json({error: error.message})
          }
          return response.json({message: "Email has been sent, kindly follow the instructions"})
        })
      }
    })
  })
}) 

usersRouter.put('/reset-password', async (request, response) => {
  const {resetLink, newPass} = request.body
  if(resetLink){
    jwt.verify(resetLink, process.env.SECRET, (error, decodedData) => {
      if(error){
        return response.status(401).json({error: "incorrect or expired token"})
      }

      User.findOne({resetLink}, (error, user) => {
        if(error || !user){
          return response.status(400).json({error: "User with this token does not exist."})
        }

        //get new password hash
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(newPass, saltRounds)

        user.passwordHash = passwordHash
        user.resetLink = '' //blank out reset link as it's now been used.
        await user.save((error, result) => {
          if(error){
            return status(400).json({error: "reset password error"})
          } else {
            return status(200).json({message: "your password has been changed"})
          }
        })

      })
    })
  } else {
      return response.status(401).json({error: "Authentication error!"})
  }
}) 
module.exports = usersRouter