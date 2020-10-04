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
                <input type='text' name="name" onChange={updateField} value={rubricName} placeholder="Rubric name" />
                <input type='submit' value='add' />
            </form>
            
        </div>
    )
}

export default RubricForm