require('dotenv').config()

const scoresRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')
const Score = require('../models/score')

scoresRouter.get('/', (req, res) => {
  Score.find({}).sort({"created": -1})
    .populate('judge')
    .then(result => {
      res.json(result)
    })
})

scoresRouter.post('/', async (req, res) => {
  const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "invalid token"})
  }
  
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  const newScore = new Score({
    judge: token.username,
    team: body.team,
    rubrics: body.rubrics,
    created: new Date(),
    user: token.id,
  })

  newScore.save()
    .then(p => p.populate('judge').execPopulate()).sort({"created": -1})
    .then(result => {
      res.json(result)
  })
})

scoresRouter.put('/:id', (req, res) => {

  const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }

  const newScore = {
      content: req.body.criterias
  }

  Score.findByIdAndUpdate(req.params.id, newScore, {new: true, useFindAndModify: false})
    .populate('judge').sort({"created": -1})
    .then(result => {
        res.json(result)
    })
})

scoresRouter.get('/company/:company', async (request, response) => {
  const scores = await Score.find({company: request.params.company})
    .populate('judge').sort({"created": -1});
      
  return response.json(scores)
})

module.exports = scoresRouter