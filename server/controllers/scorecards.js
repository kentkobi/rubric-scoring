require('dotenv').config()

const scoreCardsRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')
const ScoreCard = require('../models/scorecard')

scoreCardsRouter.get('/', (req, res) => {
  ScoreCard.find({}).sort({"created": -1})
    .then(result => {
      res.json(result)
    })
})

scoreCardsRouter.post('/', async (req, res) => {
  const token = tokenUtil.validateToken(req)
  const body = req.body

  if (!token) {
    return res.status(401).json({error: "invalid token"})
  }

  if (body.rubrics === undefined) {
    return res.status(400).json({error: 'rubrics missing'})
  }

  if (body.team === undefined) {
    return res.status(400).json({error: 'team missing'})
  }

  const newScore = new ScoreCard({
    team: body.team,
    rubrics: body.rubrics,
    created: new Date(),
    user: token.id,
  })

  newScore.save()
    .sort({"created": -1})
    .then(result => {
      res.json(result)
  })
})

scoreCardsRouter.put('/:id', (req, res) => {

  const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }

  const newScoreCard = {
      content: req.body.rubrics
  }

  ScoreCard.findByIdAndUpdate(req.params.id, newScoreCard, {new: true, useFindAndModify: false})
    .sort({"created": -1})
    .then(result => {
        res.json(result)
    })
})

scoreCardsRouter.get('/company/:company', async (request, response) => {
  const scores = await ScoreCard.find({company: request.params.company})
    .sort({"created": -1});
      
  return response.json(scores)
})

module.exports = scoreCardsRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')

scoreCardsRouter.get('/', (req, res) => {
  ScoreCard.find({}).sort({"created": -1})
    .then(result => {
      res.json(result)
    })
})

scoreCardsRouter.post('/', async (req, res) => {
  const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "invalid token"})
  }
  
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({error: 'content missing'})
  }

  const newScoreCard = new ScoreCard({
    rubrics: body.rubrics,
    created: new Date(),
    user: token.id,
  })

  newScoreCard.save()
    .sort({"created": -1})
    .then(result => {
      res.json(result)
  })
})

scoreCardsRouter.put('/:id', (req, res) => {

  const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }

  const newScore = {
      rubrics: req.body.rubrics
  }

  ScoreCard.findByIdAndUpdate(req.params.id, newScore, {new: true, useFindAndModify: false})
    .sort({"created": -1})
    .then(result => {
        res.json(result)
    })
})

scoreCardsRouter.get('/company/:company', async (request, response) => {
  const scorecards = await ScoreCard.find({company: request.params.company})
    .sort({"created": -1});
      
  return response.json(scorecards)
})

module.exports = scoreCardsRouter