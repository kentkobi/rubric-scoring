require('dotenv').config()
const postsRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')
const Post = require('../models/post')
const User = require('../models/user')

postsRouter.get('/', (req, res) => {
  Post.find({}).sort({"created": -1})
    .populate('author')
    .then(result => {
      res.json(result)
    })
})

postsRouter.post('/', async (req, res) => {
  const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "invalid token"})
  }
  
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  const newPost = new Post({
    authorUsername: token.username,
    content: body.content,
    created: new Date(),
    likes: [],
    user: token.id,
    mentions: body.content.match(/\B@[a-z0-9_-]+/gi),
    tags: body.content.match(/\B#[a-z0-9_-]+/gi)
  })

  newPost.save()
    .then(p => p.populate('author').execPopulate()).sort({"created": -1})
    .then(result => {
      res.json(result)
  })
})

postsRouter.put('/:id', (req, res) => {

  const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }

  const newPost = {
      content: req.body.content,
      likes: req.body.likes,
  }

  Post.findByIdAndUpdate(req.params.id, newPost, {new: true, useFindAndModify: false})
    .populate('author').sort({"created": -1})
    .then(result => {
        res.json(result)
    })
})

postsRouter.get('/most/popular', async (request, response) => {

  const posts = await Post.aggregate( [
    { $unwind : "$likes" },
    { 
      $group : { 
        _id : "$_id", 
        len : { $sum : 1 }, 
        doc: { $first : '$$ROOT' }
      } 
    },
    { $sort : { len : -1 } },
    { $limit : 10 },
    { $replaceRoot: { newRoot:  '$doc' } }
  ] )

  response
    .status(200)
    .send(posts) 
})

postsRouter.get('/user/:username', async (request, response) => {
  const posts = await Post.find({authorUsername: request.params.username})
    .populate('author').sort({"created": -1});
      
  return response.json(posts)
})

postsRouter.get('/user/:username/follows', async (request, response) => {
  const user = await User.findOne({username: request.params.username})
  const posts = await Post.find({authorUsername: user.follows}).populate('author').sort({"created": -1});

  return response.json(posts)
})

postsRouter.get('/user/:username/mentions', async (request, response) => {
  const posts = await Post.find({mentions: request.params.username}).populate('author').sort({"created": -1});

  return response.json(posts)
})

postsRouter.get('/user/:username/likes', async (request, response) => {
  const posts = await Post.find({likes: request.params.username}).populate('author').sort({"created": -1});

  return response.json(posts)
})

module.exports = postsRouter