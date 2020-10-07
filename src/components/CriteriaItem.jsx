import React, {useState} from 'react'
import { FaTrashAlt} from "react-icons/fa";

const CriteriaForm = ({index, criteria, removeCriteria}) => {

    return (
        <div key={index} className="form-row">  
            <div class="form-group col-md-3">
                <strong>{criteria.name}</strong>
            </div>
            <div class="form-group col-md-6">
                {criteria.description}
            </div>  
            <div class="form-group col-md-1">
                {criteria.weighting}
            </div>
            <div class="form-group col-md-2">
                <button className="btn btn-outline-danger" onClick={e => removeCriteria(criteria)}><FaTrashAlt /></button>
            </div>        
        </div>
    )
}

export default CriteriaForm