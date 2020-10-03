import React, { useState } from "react";

const Rubric = ( {rubric, addResult} ) => {
    return (
        <div className="input-group input-group-lg mb-3">
            <h3>{rubric.name}</h3>
            {rubric.criterias && criterias.map((criteria) => (
                <Criteria key={criteria.id} criteria={criteria} />
            ))}
        </div>
    )
}

export default Rubric