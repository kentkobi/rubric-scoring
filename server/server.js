require('dotenv').config()
const express = require('express') 
const app = express()
const path = require('path')

const cors = require('cors')
app.use(cors())

require('./db-connect')
const usersRouter = require('./controllers/users')
const scorecardsRouter = require('./controllers/scorecards')
const scoresRouter = require('./controllers/scores')
const middleware = require('./middleware')

app.use(express.json()) 
app.use(middleware.requestLogger)
app.use(express.static('build'))
app.use('/api/users', usersRouter)
app.use('/api/scores', scoresRouter)
app.use('/api/scorecards', scorecardsRouter)
app.use(middleware.errorMiddleware)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})