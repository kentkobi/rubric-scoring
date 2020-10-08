import React from 'react'
import TeamForm from './TeamForm'
import teamsService from '../services/teams'
import {useParams} from 'react-router-dom'

const TeamList = ({user, teams, setTeams}) => {
    const company = useParams().mention

    if (company) {
        teams = teams.filter(p => p.company && p.company === company)
    }

    const addTeam = async (newTeam) => {
        const savedTeam = await teamsService.create(newTeam)

        setTeams([...teams, savedTeam])
    }

    const deleteResult = (team) => {
        teamsService.delete(team, user)
            .then(data => {
                const updatedTeams = teams.filter(p => p.id !== team.id)
                setTeams(updatedTeams)
            })
    }

    console.log(teams)

    return(
        <div>
            <TeamForm addTeam={addTeam}/>
            <ul className="list-group list-group-flush bg-white border rounded">
                {teams && teams.map((team) => (
                    <li>{team.name}</li>
                ))}
                {teams && !teams.length &&
                    <li className="list-group-item text-muted text-center">
                        <h5>no results found</h5>
                    </li>
                }
            </ul>   
        </div>
        
    )
}
export default TeamList
