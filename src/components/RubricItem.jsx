import React from 'react'
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
        <div className="card">
            <div className="form-row card-header">
                    <div className="form-group col-md-10 mb-0">
                        <strong>{rubric.name||''} </strong>
                    </div>
                    <div className="form-group col-md-2 mb-0">
                        <button className="btn btn-sm btn-outline-danger" onClick={e => removeRubric(rubric)} ><FaTrashAlt /> Remove {rubric.name||''} Section</button>
                    </div>
                </div>
            <div className="card-body">
                <fieldset>
                    
                    {rubric.criterias && rubric.criterias.map((criteria, i) =>   
                        <CriteriaItem key={i} index={i} criteria={criteria} removeCriteria={removeCriteria}/>
                    )}
                    <CriteriaForm scoreCard={scoreCard} addCriteria={addCriteria}/>
                </fieldset>
            </div>
        </div>
    )
}

export default RubricItem