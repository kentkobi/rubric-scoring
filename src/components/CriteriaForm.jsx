import React, {useState} from 'react'

const CriteriaForm = ({index, criteria, removeCriteria}) => {
    const [name, setName] = useState(criteria.name||'')
    const [description, setDescription] = useState(criteria.description||'')
    const [weighting, setWeighting] = useState(criteria.weighting||10)

    return (
        <div key={index}>      
            <input type="text" name="name" value={criteria.name} onChange={e => setName(e.target.value)} />
            <input type="text" name="description" value={criteria.description} onChange={e => setDescription(e.target.value)} />
            <input type="text" name="weighting" value={criteria.weighting} onChange={e => setWeighting(e.target.value)} />
            <input type='button' value='remove' onClick={removeCriteria(index)}/>
        </div>
    )
}

export default CriteriaForm