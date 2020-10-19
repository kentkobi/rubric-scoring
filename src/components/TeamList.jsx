import React from 'react'
import TeamForm from './TeamForm'
import teamsService from '../services/teams'
import { FaTrashAlt} from "react-icons/fa";

const TeamList = ({user, teams, setTeams}) => {

    const addTeam = async (newTeam) => {
        const savedTeam = await teamsService.create(newTeam)

        setTeams([...teams, savedTeam])
    }

    const deleteTeam = (id) => {
        teamsService.remove(id, user)
            .then(data => {
                const updatedTeams = teams.filter(p => p.id !== id)
                setTeams(updatedTeams)
            })
    }

    return(
        <div>
            <TeamForm addTeam={addTeam}/>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {teams && teams.map((team) => (
                        <tr>
                            <td>{team.name}</td>
                            <td className="text-right">
                                <button className="btn btn-sm btn-outline-danger" onClick={e => deleteTeam(team.id)}><FaTrashAlt /></button>
                            </td>
                        </tr>
                    ))}
                    {teams && !teams.length &&
                        <tr>
                            <td colspan="3" className="text-muted text-center">no results found</td>
                        </tr>
                    }
                </tbody>
            </table>
            </div>
        
    )
}
export default TeamList
