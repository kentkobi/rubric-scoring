import React from "react";

const Criteria = ( {criteria} ) => {
    
    const updateScore = (event) => {
        criteria.score = event.target.value
    }

    return (
        <div className="input-group input-group-lg mb-3">
            <h4>{criteria.name}</h4>
            <p>{criteria.description}</p>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="score" id="inlineRadio1" onChange={updateScore}  defaultValue={criteria.weighting/5 * 1} />
                <label class="form-check-label" for="inlineRadio1">1</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="score" id="inlineRadio2" onChange={updateScore} defaultValue={criteria.weighting/5 * 2}  />
                <label class="form-check-label" for="inlineRadio2">2</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="score" id="inlineRadio3" onChange={updateScore} defaultValue={criteria.weighting/5 * 3}  />
                <label class="form-check-label" for="inlineRadio3">3</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="score" id="inlineRadio4" onChange={updateScore} defaultValue={criteria.weighting/5 * 4}  />
                <label class="form-check-label" for="inlineRadio4">4</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="score" id="inlineRadio5" onChange={updateScore} defaultValue={criteria.weighting/5 * 5}  />
                <label class="form-check-label" for="inlineRadio5">5</label>
            </div>
        </div>
    )
}

export default Criteria