require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const teamsRouter = require('express').Router()
const tokenUtil = require('../utils/token.js')
const Team = require('../models/team')


teamsRouter.post('/', async (request, response) => {
  const body = request.body
  /*const token = tokenUtil.validateToken(request)

  if (!token) {
    return response.status(401).json({error: "invalid token"})
  }*/

  const team = new Team({
    name: body.name
  })

  try {
    const savedTeam = await team.save()
  
    response
      .status(200)
      .send({
        id: savedTeam.id, 
        name: savedTeam.name})
  } 
  catch (error) {
    return response.status(500).send({error: error.message})
  }
})

teamsRouter.get('/', async (request, response) => {
  const users = await Team.find({})
  response.json(users)
})
  
teamsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  /*const token = tokenUtil.validateToken(req)

  if (!token) {
    return res.status(401).json({error: "permission denied"})
  }*/
  
  Team.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).json(result).end()
    })
    .catch(error => next(error))
})

module.exports = teamsRouter