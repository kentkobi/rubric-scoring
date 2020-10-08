import React, { useState } from "react";
import ScoreResultItem from './ScoreResultItem'
import RubricForm from './RubricForm'
import RubricItem from './RubricItem'
import scoreCardsService from '../services/scorecards'

const ScoreResults = ( {user, scoreResults, setScoreResults} ) => {
    const [errorMessage, setErrorMessage] = useState('')
console.log(scoreResults)
    return (
        <div>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <ul className="list-group list-group-flush bg-white border rounded">
                {scoreResults && scoreResults.map((result, index) => (
                    <ScoreResultItem key={result.id} index={index+1} result={result} user={user} />
                ))}
                {scoreResults && !scoreResults.length &&
                    <li className="list-group-item text-muted text-center">
                        <h5>no results found</h5>
                    </li>
                }
            </ul>
        </div>
    )
}

export default ScoreResults