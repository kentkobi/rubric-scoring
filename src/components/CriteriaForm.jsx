import React, {useState} from 'react'

const CriteriaForm = ({addCriteria}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [weighting, setWeighting] = useState('')

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
            <div class="form-row">
                <div class="form-group col-md-3">
                    <input class="form-control" type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="title" required/>
                </div>
                <div class="form-group col-md-6">
                    <textarea class="form-control" rows="3" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="description"></textarea>
                </div>  
                <div class="form-group col-md-1">
                    <input class="form-control" type="number" name="weighting" value={weighting} onChange={e => setWeighting(e.target.value)} placeholder="weighting" required/>
                </div>
                <div class="form-group col-md-2">
                    <input type='submit' className="btn btn-primary" value='add criteria' />
                </div>   
            </div>
        </form>
    )
}

export default CriteriaForm