import React, {useState} from 'react'
import CriteriaForm from './CriteriaForm'
import CriteriaItem from './CriteriaItem'
import scoreCardsService from '../services/scorecards'
import { FaTrashAlt} from "react-icons/fa";

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
            <div class="form-row">
                <div class="form-group col-md-10">
                    <h3>{rubric.name||''} </h3>
                </div>
                <div class="form-group col-md-2">
                    <button className="btn btn-outline-danger" onClick={e => removeRubric(rubric)} ><FaTrashAlt /> Remove {rubric.name||''} Section</button>
                </div>
            </div>
            
            <fieldset>
                
                {rubric.criterias && rubric.criterias.map((criteria, i) =>   
                    <CriteriaItem key={i} index={i} criteria={criteria} removeCriteria={removeCriteria}/>
                )}
                <CriteriaForm scoreCard={scoreCard} addCriteria={addCriteria}/>
            </fieldset>
            <hr />
        </div>
    )
}

export default RubricItem