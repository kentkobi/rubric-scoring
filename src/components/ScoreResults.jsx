import React from "react";
import ScoreResultItem from './ScoreResultItem'

const ScoreResults = ( {user, scoreResults} ) => {
    return (
        <div>
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