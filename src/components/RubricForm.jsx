import React, {useState} from 'react'
import CriteriaForm from './CriteriaForm'

const RubricForm = ({scoreCard, addRubric, user}) => {
    const [errorMessage, setErrorMessage] = useState('')
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
        <div className="rubric">
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

            <form onSubmit={formHandler}>
                <div class="form-row">
                    <div class="form-group col-md-10">
                        <input type='text' className="form-control" name="name" onChange={updateField} value={rubricName} placeholder="Rubric name" />
                    </div>
                    <div class="form-group col-md-2">
                        <input type='submit' className="btn btn-primary" value='Add Section' />
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default RubricForm