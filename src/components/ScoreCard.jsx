import React, { useState } from "react";
import Rubric from './Rubric'

const ScoreCard = ( {user, teams, scoreCard, addResult} ) => {
    const [scoreCardEntry, setScoreCardEntry] = useState(scoreCard)
    const [teamName, setTeamName] = useState(scoreCard.team || "")

    const formHandler = (event) => {
        event.preventDefault()

        addResult(teamName, user, scoreCardEntry)
    }
    
    return (
        <form onSubmit={formHandler}>
            <div className="">
                <div className="card">
                    <div className="card-body">
                        <select className="form-control" name="team" value={teamName} onChange={e => setTeamName(e.target.value)}>
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