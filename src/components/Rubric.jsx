import React, { useState } from "react";
import Criteria from './Criteria'

const Rubric = ( {rubric, addResult} ) => {
    return (
        <div className="mb-3">
            <h3>{rubric.name}</h3>
            {rubric.criterias && rubric.criterias.map((criteria) => (
                <Criteria key={criteria.id} criteria={criteria} />
            ))}
        </div>
    )
}

export default Rubric