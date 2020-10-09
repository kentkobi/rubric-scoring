import React, { useState, useEffect } from "react";

/* services */
import scoreCardsService from './services/scorecards'
import scoresService from './services/scores'
import teamsService from './services/teams'

/* components */
import UserCard from "./components/UserCard"
import ScoreCard from "./components/ScoreCard"
import ScoreCardForm from "./components/ScoreCardForm"
import ScoreResults from "./components/ScoreResults"
import ProfileForm from "./components/ProfileForm"
import RegisterForm from "./components/RegisterForm"
import ResultList from "./components/ResultList"
import TeamList from "./components/TeamList"

/* modules */
import SideNav from "./modules/SideNav"
import Navbar from "./modules/Navbar"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { RiContactsBookLine } from "react-icons/ri";


const App = () => {
  const [user, setUser] = useState(null)
  const [teams, setTeams] = useState(null)
  const [results, setResults] = useState([])
  const [scoreResults, setScoreResults] = useState([])
  const [scoreCard, setScoreCard] = useState({})

  const addResult = (team, judge, scores) => {
    const scoreEntry = {
      judge: judge.username,
      company: scores.company,
      team: team,
      scores: scores
    }

    scoresService.create(scoreEntry)
      .then(data => {
        setResults([data, ...results])
      })
  }

  const updateScoreCard = (scoreCard) => {
    scoreCardsService.update(scoreCard, user)
      .then(data => {
        setScoreCard(data)
      })
  }
  
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    if(user && user.company) {
      scoreCardsService.getByCompany(user.company)
        .then((scorecard) => {
            setScoreCard(scorecard)  
        })

      scoresService.getByCompany(user.company)
        .then((results) => {
            setResults(results)
        })

      scoresService.getResultsByCompany(user.company)
        .then((results) => {
            setScoreResults(results)
        })

      teamsService.getAll()
        .then((results) => {
          setTeams(results)

          console.log(teams)
    })
    }
  }, [user])

  return (
      <Router>
        <div className="container-fluid">
          <div className="row min-vh-100">
          
            <nav id="site-sidenav" className="col-md-2 p-0 bg-dark flex-grow-1">
              {user !== null  && <UserCard user={user}/>}
              <SideNav user={user} setUser={setUser}/>
            </nav>
            
            <main className="col p-0 bg-light">
              <Navbar user={user} setUser={setUser} />
              <Switch>
                <Route path="/score">
                  {user === null ? <Redirect to="/register" /> : <ScoreCard user={user} teams={teams} scoreCard={scoreCard} addResult={addResult} />}
                </Route>
                <Route path="/teams">
                  {user === null ? <Redirect to="/register" /> : <TeamList user={user} teams={teams} setTeams={setTeams} />}
                </Route>
                <Route path="/:company/results">
                  {user === null ? <Redirect to="/register" /> : <ScoreResults user={user} scoreResults={scoreResults} setScoreResults={setScoreResults} />}
                </Route>
                <Route path="/setup">
                  {user === null ? <Redirect to="/register" /> : <ScoreCardForm user={user} scoreCard={scoreCard} setScoreCard={setScoreCard} />}
                </Route>
                <Route path="/profile">
                  {user === null ? <Redirect to="/register" /> : <ProfileForm user={user} setUser={setUser}/>}
                </Route>
                <Route path="/register">
                  {user !== null ? <Redirect to="/" /> : <RegisterForm user={user} setUser={setUser}/>}
                </Route>
                <Route path="/">
                  {user === null ? <Redirect to="/register" /> : <ResultList user={user} results={results} setResults={setResults} />}
                </Route>
              </Switch>
            </main>
          </div>
        </div>
      </Router>
  );
}

export default App;
