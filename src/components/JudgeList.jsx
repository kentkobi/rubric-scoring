import React from 'react'
import JudgeForm from './JudgeForm'
import usersService from '../services/users'
import {useParams} from 'react-router-dom'

const ProfileList = ({user, users, setUsers}) => {
    const company = useParams().mention

    if (company) {
        users = users.filter(p => p.company && p.company === company)
    }

    const addJudge = async (newUser) => {
        const savedUser = await usersService.register(newUser)
        setUsers([...users, savedUser])
    }

    /*const deleteResult = (team) => {
        usersService.delete(team, user)
            .then(data => {
                const updatedTeams = teams.filter(p => p.id !== team.id)
                setTeams(updatedTeams)
            })
    }*/

    return(
        <div>
            <JudgeForm addJudge={addJudge}/>
            <ul className="list-group list-group-flush bg-white border rounded">
                {users && users.map((user) => (
                    <li>{user.name} - {user.username} - {user.company} - {user.password}</li>
                ))}
                {users && !users.length &&
                    <li className="list-group-item text-muted text-center">
                        <h5>no results found</h5>
                    </li>
                }
            </ul>   
        </div>
        
    )
}
export default ProfileList
