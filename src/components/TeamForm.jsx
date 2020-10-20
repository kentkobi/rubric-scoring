import React, {useState} from 'react'

const TeamForm = ({addTeam, user}) => {
    const [teamName, setTeamName] = useState('')
    const updateField = (event) => {
        setTeamName(event.target.value)
    }
    const formHandler = (event) => {
        event.preventDefault()

        addTeam({
            name: teamName
        })
        setTeamName('')
    }

    return (
        <div className="card rubric">
            <form onSubmit={formHandler}>
                <div class="form-row card-header">
                    <div class="form-group col-md-10 mb-0">
                        <input type='text' className="form-control" name="name" onChange={updateField} value={teamName} placeholder="Team name" />
                    </div>
                    <div class="form-group col-md-2 mb-0">
                        <input type='submit' className="btn btn-primary" value='Add Team' />
                    </div>
                </div>
            </form>     
        </div>
    )
}

export default TeamForm