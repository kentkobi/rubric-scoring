import React, {useState} from 'react'
import CriteriaForm from './CriteriaForm'
import CriteriaItem from './CriteriaItem'
import scoreCardsService from '../services/scorecards'

const RubricItem = ({user, index, scoreCard, rubric, setScoreCard, removeRubric}) => {

    const addCriteria = async (criteria) => {
      let newScoreCard = scoreCard
      newScoreCard.rubrics[index].criterias = [...newScoreCard.rubrics[index].criterias, criteria]

      const test = await scoreCardsService.update(newScoreCard)
      setScoreCard(test)
    }

    const removeCriteria = async (criteria) => {
      const newScoreCard = scoreCard
      newScoreCard.rubrics[index].criterias = newScoreCard.rubrics[index].criterias.filter(c => c.name !== criteria.name);

      const test = await scoreCardsService.update(newScoreCard)

      setScoreCard(test)
    }

    return (
        <div className="rubric">
            <h3>{rubric.name||''} <input type='button' value='remove' onClick={e => removeRubric(rubric)} /></h3>
            <fieldset>
                <CriteriaForm scoreCard={scoreCard} addCriteria={addCriteria}/>
                {rubric.criterias && rubric.criterias.map((criteria, i) =>   
                    <CriteriaItem key={i} index={i} criteria={criteria} removeCriteria={removeCriteria}/>
                )}
            </fieldset>
        </div>
    )
}

export default RubricItem