import React, { useState } from "react";
import Rubric from './Rubric'

const ScoreCard = ( {user, scoreCard, addResult} ) => {
    const [scoreCardEntry, setScoreCardEntry] = useState(scoreCard)
    const [teamName, setTeamName] = useState(scoreCard.team || "")

    const formHandler = (event) => {
        event.preventDefault()

        addResult(teamName, user, scoreCardEntry)
        /*addResult( {
            scoreCardEntry 
        })*/
        //setScoreCardEntry(scoreCard)
    }
    
    return (
        <form onSubmit={formHandler}>
            <input type='text' name="team" value={teamName} onChange={e => setTeamName(e.target.value)}/>
            <div className="mb-3">
                {scoreCardEntry.rubrics && scoreCardEntry.rubrics.map((rubric) => (
                    <Rubric key={rubric.id} rubric={rubric} user={user}/>
                ))}
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}

export default ScoreCard