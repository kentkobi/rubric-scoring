import React, { useState, useEffect } from "react";
import Rubric from './Rubric'

const ScoreCard = ( {user, teams, scoreCard, addResult} ) => {
    const initialState = JSON.parse(JSON.stringify(scoreCard)) 
    const [scoreCardEntry, setScoreCardEntry] = useState( initialState )
    const [teamName, setTeamName] = useState("")

    const formHandler = async (event) => {
        event.preventDefault()
        event.target.reset(); //reset form for any uncontrolled inputs

        addResult(teamName, user, scoreCardEntry)
        setScoreCardEntry( initialState )
    }
    
    return (
        <form onSubmit={formHandler}>
            <div className="">
                <div className="card">
                    <div className="card-body">
                        <select className="form-control" name="team" value={teamName} onChange={e => setTeamName(e.target.value)} required>
                            <option value="" selected disabled hidden>Choose Team</option>
                            {teams && teams.map((team) => (
                                <option value={team.name}>{team.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            
            <div className="mb-3">
                {scoreCardEntry.rubrics && scoreCardEntry.rubrics.map((rubric) => (
                    <Rubric key={rubric.id} rubric={rubric} user={user}/>
                ))}
            </div>

            <div className="text-center">
                <button className="btn btn-primary btn-lg" type="submit">Submit Scores</button>
            </div>
            
        </form>
    )
}

export default ScoreCard