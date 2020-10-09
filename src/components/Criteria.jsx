import React, {useState} from 'react'

const Criteria = ( {criteria} ) => {
    const [criteriaScore, setCriteriaScore] = useState('')
    const updateScore = (event) => {
        criteria.score = event.target.value
        setCriteriaScore(event.target.value)
    }

    return (
        <div className="form-row">  
            <div class="form-group col-md-3">
                <strong>{criteria.name}</strong>
            </div>
            <div class="form-group col-md-6">
                {criteria.description}
            </div>  
            <div class="form-group col-md-1">
                <input type="number" name="score" onChange={updateScore} value={criteriaScore} min="0" max={criteria.weighting} required/> / {criteria.weighting}
            </div>    
        </div>
    )
}

export default Criteria