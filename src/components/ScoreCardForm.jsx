import React, { useState } from "react";
import RubricForm from './RubricForm'

const ScoreCard = ( {user, scoreCard, setScoreCard} ) => {
    const [errorMessage, setErrorMessage] = useState('')
     
    const addRubric = () => {
        const newRubric = {
            name: "",
            company: user.company,
            criterias: []
        }
        setScoreCard({ rubrics: [...scoreCard.rubrics, newRubric]})
    }
     
    const removeRubric = (i) => {
        let rubrics = [...scoreCard.rubrics];
        rubrics.splice(i,1);
        setScoreCard({ rubrics });
    }

    const handleSubmit = (event) => {
        console.log(score);
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                <input type='hidden' name="judge" defaultVaue={user.name} />
                <input type='hidden' name="company" defaultVaue={user.company} />
                <input type='text' name="team" defaultVaue={scoreCard.team || ""} />
                {scoreCard.rubrics.map((rubric, i) =>   
                    <RubricForm index={i} rubric={rubric} removeRubric={removeRubric}/>
                )}
                <input type='button' value='add more' onClick={addRubric} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default ScoreCard