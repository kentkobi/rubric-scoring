import React, { useState } from "react";
import Rubric from './Rubric'

const ScoreCard = ( {user, scoreCard, addResult} ) => {
    const [scoreCardEntry, setScoreCardEntry] = useState(scoreCard)

    const formHandler = (event) => {
        event.preventDefault()

        addResult( scoreCardEntry )
        setScoreCardEntry(scoreCard)
    }
    
    return (
        <form onSubmit={formHandler}>
            <input type='hidden' name="judge" defaultVaue={user.name} />
            <input type='hidden' name="company" defaultVaue={user.company} />
            <input type='text' name="team" defaultVaue={scoreCard.team || ""} />
            <div className="input-group input-group-lg mb-3">
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