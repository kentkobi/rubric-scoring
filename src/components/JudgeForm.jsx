/* eslint-disable react/prop-types */
import React, {useState} from 'react'

const JudgeForm = ({judge, assignToGroup}) => {
    const existingGroup = (judge.user_metadata && judge.user_metadata.assigned) ? judge.user_metadata.assigned : ''
    const [group, setGroup] = useState(existingGroup)
    const [btnLabel, setBtnLabel] = useState(group !== '' ? "Assigned" : "Assign");

    const formHandler = (event) => {
        event.preventDefault()
        assignToGroup(judge.user_id, group)
        setBtnLabel("Assigned")
    }

    const onGroupChange = (event) => {
        setGroup(event.target.value)
        setBtnLabel("Assign")
    }
  
    return (
        <form className="form-inline" onSubmit={formHandler}>
            <input type="text" 
                className="form-control mb-2 mr-sm-2" 
                name="group" 
                defaultValue={group} 
                onChange={e => onGroupChange(e)} 
                placeholder="Judging for..." required/>
            <button type="submit" 
                className='btn btn-primary mb-2'>
                {btnLabel}
            </button>
        </form>
    )
}

  export default JudgeForm