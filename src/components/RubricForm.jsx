import React, {useState} from 'react'

const RubricForm = ({addRubric}) => {
    const [rubricName, setRubricName] = useState('')
    const updateField = (event) => {
        setRubricName(event.target.value)
    }
    const formHandler = (event) => {
        event.preventDefault()

        addRubric({
            name: rubricName,
            criterias: []
        })
        setRubricName('')
    }

    return (
        <div className="card rubric">
            <form onSubmit={formHandler}>
                <div class="form-row card-header">
                    <div class="form-group col-md-10 mb-0">
                        <input type='text' className="form-control" name="name" onChange={updateField} value={rubricName} placeholder="Rubric name" />
                    </div>
                    <div class="form-group col-md-2 mb-0">
                        <input type='submit' className="btn btn-primary" value='Add Section' />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RubricForm