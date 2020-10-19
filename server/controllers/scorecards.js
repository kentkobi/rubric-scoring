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
  //const token = tokenUtil.validateToken(req)
  const body = req.body

  /*if (!token) {
    return res.status(401).json({error: "invalid token"})
  }*/

  if (body.rubrics === undefined) {
    return res.status(400).json({error: 'rubrics missing'})
  }

  if (body.team === undefined) {
    return res.status(400).json({error: 'team missing'})
  }

  const newScore = new ScoreCard({
    rubrics: body.rubrics,
    created: new Date(),
  })

  newScore.save()
    .sort({"created": -1})
    .then(result => {
      res.json(result)
  })
})

scoreCardsRouter.put('/:id', (req, res) => {

  /*const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }*/

  const newScoreCard = {
    rubrics: req.body.rubrics
  }

  ScoreCard.findByIdAndUpdate(req.params.id, newScoreCard, {new: true, useFindAndModify: false})
    .then(result => {
        console.log(result)
        res.json(result)
    })
})

scoreCardsRouter.get('/company/:company', async (request, response) => {
  const scoreCard = await ScoreCard.findOne({company: request.params.company});

  if(scoreCard){
    return response.json(scoreCard)
  } else {
    const newScoreCard = new ScoreCard({
      created: new Date(),
      company: request.params.company
    })
    
    newScoreCard.save()
      .then(result => {
        response.json(result)
      })
  }
  
})

module.exports = scoreCardsRouter