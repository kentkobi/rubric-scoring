import React from "react";
import Criteria from './Criteria'

const Rubric = ( {rubric, addResult} ) => {
    return (
        <div className="card">
            <div className="form-row card-header">
                    <div className="form-group col-md-12 mb-0">
                        <strong>{rubric.name||''} </strong>
                    </div>
                </div>
            <div className="card-body">
                <fieldset>
                {rubric.criterias && rubric.criterias.map((criteria) => (
                    <Criteria key={criteria.id} criteria={criteria} />
                ))}
                </fieldset>
            </div>
        </div>
    )
}

export default Rubric