import React, {useState} from 'react'

const CriteriaForm = ({addCriteria}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [weighting, setWeighting] = useState(10)

    const formHandler = (event) => {
        event.preventDefault()

        addCriteria({
            name: name,
            description: description,
            weighting: weighting
        })
        setName('')
        setDescription('')
        setWeighting('')
    }

    return ( 
        <form onSubmit={formHandler}>      
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="title" />
            <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="description" />
            <input type="text" name="weighting" value={weighting} onChange={e => setWeighting(e.target.value)} placeholder="weighting" />
            
            <input type='submit' value='add criteria' />
        </form>
    )
}

export default CriteriaForm