import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { FaHome, FaMedal, FaListAlt, FaUserEdit, FaUsersCog, FaEdit, FaList } from "react-icons/fa"
import { RiLogoutCircleLine } from "react-icons/ri"
import { Link } from 'react-router-dom'

const UserSideNav = ({user}) => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    return(    
        <div>
            {isAuthenticated &&
                <div className="list-group list-group-flush">
                    {user && user.assigned &&
                        <div className="judge-controls">
                            <Link to="/score" className="list-group-item list-group-item-action bg-dark text-primary"><FaEdit /> ENTER A SCORE</Link>
                            <Link to={`/${user.assigned}/results`} className="list-group-item list-group-item-action bg-dark text-primary"><FaMedal /> SCORE RESULTS</Link>
                            <Link to="/setup" className="list-group-item list-group-item-action bg-dark text-primary"><FaListAlt /> EDIT SCORECARD</Link>
                            <Link to="/results" className="list-group-item list-group-item-action bg-dark text-primary"><FaList /> MY SCORES</Link>
                        </div>
                    }
                    <a className="list-group-item list-group-item-action bg-dark" href="/logout" onClick={e => logout()}><RiLogoutCircleLine /> LOG OUT</a>
                    
                    {user && user.roles && user.roles.includes("Admin") &&
                        <div className="admin-controls">
                            <h5 className="list-group-item list-group-item-action bg-dark text-primary">ADMIN CONTROLS</h5>
                            <Link to="/default" className="list-group-item list-group-item-action bg-dark text-primary"><FaListAlt /> DEFAULT SCORECARD</Link>
                            <Link to="/teams" className="list-group-item list-group-item-action bg-dark text-primary"><FaUserEdit /> CREATE TEAMS</Link>
                            <Link to="/judges" className="list-group-item list-group-item-action bg-dark text-primary"><FaUsersCog /> ASSIGN JUDGES</Link>
                        </div>
                    }   
                </div>
            } 
            {!isAuthenticated &&
                <div className="list-group list-group-flush">
                    <Link to="/" className="list-group-item list-group-item-action bg-dark text-primary"><FaHome /> HOME</Link>
                    <a className="list-group-item list-group-item-action bg-dark text-primary" href="/login" onClick={e => loginWithRedirect()}><FaUserEdit /> LOG IN</a>
                </div>
            }
        </div>
    )
}

export default UserSideNav