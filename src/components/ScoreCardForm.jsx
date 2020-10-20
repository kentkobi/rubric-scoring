import React from "react";
import RubricForm from './RubricForm'
import RubricItem from './RubricItem'
import scoreCardsService from '../services/scorecards'

const ScoreCard = ( {user, scoreCard, setScoreCard} ) => {
     
    const addRubric = async (rubric) => {
        const newScoreCard = scoreCard
        newScoreCard.rubrics = [...scoreCard.rubrics, rubric]

        const test = await scoreCardsService.update(newScoreCard)

        setScoreCard(test)
    }

    const removeRubric = async (rubric) => {
        const newScoreCard = scoreCard
        newScoreCard.rubrics = newScoreCard.rubrics.filter(r => r.name !== rubric.name);

        const test = await scoreCardsService.update(newScoreCard)

        setScoreCard(test)
    }

    return (
        <div className="">
            {scoreCard.rubrics && scoreCard.rubrics.map((rubric, i) =>   
                <RubricItem key={i} index={i} scoreCard={scoreCard} setScoreCard={setScoreCard} rubric={rubric} removeRubric={removeRubric}/>
            )}
            <RubricForm scoreCard={scoreCard} addRubric={addRubric} user={user}/>
        </div>
    )
}

export default ScoreCard