import React, {useState} from 'react'

const CriteriaForm = ({index, criteria, removeCriteria}) => {

    return (
        <div key={index}>      
            {criteria.name}
            {criteria.description}
            {criteria.weighting}
            <input type='button' value='remove' onClick={e => removeCriteria(criteria)} />
        </div>
    )
}

export default CriteriaForm