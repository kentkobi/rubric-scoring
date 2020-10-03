import React, {useState} from 'react'
import CriteriaForm from './CriteriaForm'

const RubricForm = ({user, rubric, setRubric}) => {
    const [errorMessage, setErrorMessage] = useState('')
     
    const addCriteria = () => {
        const newCriteria = {
            name: "",
            description: "",
            weighting: 10
        }
        setRubric({ criterias: [...rubric.criterias, newCriteria]})
    }
     
    const removeCriteria = (i) => {
        let criterias = [...rubric.criterias];
        criterias.splice(i,1);
        setRubric({ criterias });
    }

    const handleSubmit = (event) => {
        console.log(rubric);
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                <input type='hidden' name="id" defaultVaue={rubric.id || ""} />
                <input type='hidden' name="company" defaultVaue={user.company} />
                <input type='text' name="name" defaultVaue={rubric.name} />
                {rubric.criterias.map((criteria, i) =>   
                    <CriteriaForm index={i} criteria={criteria} removeCriteria={removeCriteria}/>
                )}
                <input type='button' value='add more' onClick={addCriteria} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default RubricForm