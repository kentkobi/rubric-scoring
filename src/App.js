import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

/* services */
import scoreCardsService from './services/scorecards'
import scoresService from './services/scores'
import teamsService from './services/teams'
import usersService from './services/users'

/* components */
import PrivateRoute from "./components/private-route"
import UserCard from "./components/UserCard"
import ScoreCard from "./components/ScoreCard"
import ScoreCardForm from "./components/ScoreCardForm"
import ScoreResults from "./components/ScoreResults"
import ResultList from "./components/ResultList"
import TeamList from "./components/TeamList"
import JudgeList from "./components/JudgeList"

/* modules */
import SideNav from "./modules/SideNav"
import Welcome from "./modules/Welcome"

import {
  Switch,
  Route
} from "react-router-dom"
import Loading from "./components/Loading";

const App = () => {
  const [users, setUsers] = useState(null)
  const [teams, setTeams] = useState(null)
  const [results, setResults] = useState([])
  const [scoreResults, setScoreResults] = useState([])
  const [scoreCard, setScoreCard] = useState(null)
  const [defaultScoreCard, setDefaultScoreCard] = useState(null)

  const {user, isAuthenticated} = useAuth0()

  const addResult = (team, judge, scores) => {
    const scoreEntry = {
      judge: judge.name,
      company: scores.company,
      team: team,
      scores: scores
    }

    scoresService.create(scoreEntry)
      .then(data => {
        setResults([data, ...results])
      })
  }
  
  useEffect(() => {
    /* grab all the student teams to be judged */
    teamsService.getAll()
        .then((results) => {
          setTeams(results)
      })

    /* grab all the judges or potential judges */
    usersService.getAll()
      .then((results) => {
        setUsers(results)
    })

    /* grab the default scoring rubric */
    scoreCardsService.getByCompany('default')
        .then((scorecard) => {
            setDefaultScoreCard(scorecard)  
        })
  }, [])

  useEffect(() => {
    const assignedTo = (user && 
        user[process.env.REACT_APP_AUTH0_USER_META_URL] && 
        user[process.env.REACT_APP_AUTH0_USER_META_URL].assigned) 
      ? user[process.env.REACT_APP_AUTH0_USER_META_URL].assigned
      : null
    if(user){
      user.assigned = "Optus"
      //user.assigned = assignedTo
    }
  }, [user])

  useEffect(() => {
    console.log('user',user)
    
    if(user && user.assigned ) {
      scoreCardsService.getByCompany(user.assigned)
        .then((scorecard) => {
            if (scorecard.rubrics && scorecard.rubrics.length){
              console.log(scorecard.rubrics.length, "has a scorecard!")
              setScoreCard(scorecard)  
            } else {
              console.log("no scorecard - seeding with default scorecard")
              setScoreCard(defaultScoreCard)
            } 
        })

      scoresService.getByCompany(user.assigned)
        .then((results) => {
            setResults(results)
        })

      scoresService.getResultsByCompany(user.assigned)
        .then((results) => {
            setScoreResults(results)
        })
    }
  }, [user, defaultScoreCard])

  const {isLoading} = useAuth0()

  if(isLoading){
    return <Loading />
  }

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
      
        <nav id="site-sidenav" className="col-md-2 p-0 bg-dark flex-grow-1">
          <UserCard user={user}/>
          <SideNav user={user}/>
        </nav>
        
        <main className="col p-0 bg-light">
        <Switch>
            <PrivateRoute path="/score">
              <ScoreCard user={user} teams={teams} scoreCard={scoreCard} addResult={addResult} />
            </PrivateRoute>
            <PrivateRoute path="/teams">
              <TeamList user={user} teams={teams} setTeams={setTeams} />
            </PrivateRoute>
            <PrivateRoute path="/judges">
              <JudgeList user={user} users={users} setUsers={setUsers} />
            </PrivateRoute>
            <PrivateRoute path="/:company/results">
              <ScoreResults user={user} scoreResults={scoreResults} setScoreResults={setScoreResults} />
            </PrivateRoute>
            <PrivateRoute path="/setup">
              <ScoreCardForm user={user} scoreCard={scoreCard} setScoreCard={setScoreCard} />
            </PrivateRoute>
            <PrivateRoute path="/default">
              <ScoreCardForm user={user} scoreCard={defaultScoreCard} setScoreCard={setDefaultScoreCard} />
            </PrivateRoute>
            <Route path="/results">
              <ResultList user={user} results={results} setResults={setResults} />
            </Route>
            <Route path="/">
              <Welcome user={user} />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
