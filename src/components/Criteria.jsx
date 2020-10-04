import React, {useState} from 'react'

const Criteria = ( {criteria} ) => {
    const [criteriaScore, setCriteriaScore] = useState('')
    const updateScore = (event) => {
        criteria.score = event.target.value
        setCriteriaScore(event.target.value)
    }

    return (
        <div className="mb-3">
            <h4>{criteria.name}</h4>
            <p>{criteria.description}</p>

             <input type="number" name="score" onChange={updateScore} value={criteriaScore} min="0" max={criteria.weighting} required/> / {criteria.weighting}
        </div>
    )
}

export default Criteria