import React from 'react'
import { FaTrashAlt} from "react-icons/fa";

const CriteriaForm = ({index, criteria, removeCriteria}) => {

    return (
        <div key={index} className="form-row">  
            <div className="form-group col-md-3">
                <strong>{criteria.name}</strong>
            </div>
            <div className="form-group col-md-6">
                {criteria.description}
            </div>  
            <div className="form-group col-md-1">
                {criteria.weighting}
            </div>
            <div className="form-group col-md-2">
                <button className="btn btn-sm btn-outline-danger" onClick={e => removeCriteria(criteria)}><FaTrashAlt /></button>
            </div>        
        </div>
    )
}

export default CriteriaForm