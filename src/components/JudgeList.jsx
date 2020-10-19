import React from 'react'
import JudgeForm from './JudgeForm'
import usersService from '../services/users'

const ProfileList = ({user, users, setUsers}) => {

    const assignToGroup = async (user_id, group) => {
        const savedUser = await usersService.assignToGroup(user_id, group)
        //setUsers([...users, savedUser])
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
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Judge Group</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((judge) => (
                        <tr>
                            <td>{judge.name}</td>
                            <td>{judge.email}</td>
                            <td><JudgeForm judge={judge} assignToGroup={assignToGroup}/></td>
                        </tr>
                    ))}
                    {users && !users.length &&
                        <tr>
                            <td colspan="3" className="text-muted text-center">no results found</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ProfileList
