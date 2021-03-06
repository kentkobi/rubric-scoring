require('dotenv').config()

const scoresRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')
const Score = require('../models/score')
const User = require('../models/user')

scoresRouter.get('/', (req, res) => {
  Score.find({}).sort({"created": -1})
    .populate('judge')
    .then(result => {
      res.json(result)
    })
})

scoresRouter.post('/', async (req, res) => {
  /*const token = tokenUtil.validateToken(req)

  console.log(req)

  if (!token) {
    return res.status(401).json({error: "invalid token"})
  }*/
  
  const body = req.body

  if (body.team === undefined) {
    return res.status(400).json({error: 'team missing'})
  }
  if (body.scores === undefined) {
    return res.status(400).json({error: 'scores missing'})
  }
  if (body.judge === undefined) {
    return res.status(400).json({error: 'judge missing'})
  }

  // grab all the criterias...
  let criterias = body.scores.rubrics.map(function(rubric){
    return rubric.criterias
  })

  // and calculate the judges total score
  let totalScore = []
    .concat(...criterias)
    .map(criteria => criteria.score)
    .reduce((accumulator, score) => accumulator + parseInt(score), 0);

  const newScore = new Score({
    created: new Date(),
    submitted: body.judge,
    team: body.team,
    scores: body.scores,
    score: totalScore,
    company: body.company
  })

  console.log(newScore)

  newScore.save()
    .then(p => p.populate('judge').execPopulate())
    .then(result => {
      res.json(result)
  })
})

scoresRouter.put('/:id', (req, res) => {

  /*const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }*/

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
    .populate('judge')
    .sort({"created": -1});
      
  return response.json(scores)
})

scoresRouter.get('/company/:company/results', async (request, response) => {
  const scores = await Score.aggregate([
    {$match: {company: request.params.company}},
    {$group: {
        _id: "$team",
        team: { $first: "$team" },
        count: { $sum: 1 }, 
        total: { $sum: "$score"},
        breakdown : { $push: { 
          id: "$_id", 
          judge: "$submitted", 
          score: "$score" }}
      }
    },
    {$sort: {"total": -1}}
  ])
  console.log(scores)

  return response.json(scores)
})

scoresRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  /*const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }*/
  
  Score.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).json(result).end()
    })
    .catch(error => next(error))
})

module.exports = scoresRouter