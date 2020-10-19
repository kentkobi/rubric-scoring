import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { FaHome, FaUserEdit, FaPlus, FaAt, FaRegHeart } from "react-icons/fa"
import { RiLogoutCircleLine } from "react-icons/ri"
import { Link } from 'react-router-dom'

const UserSideNav = ({user, setUser}) => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0()

    return(    
        <div>
            {isAuthenticated &&
                <div className="list-group list-group-flush">
                    {user && user.assigned &&
                        <div className="judge-controls">
                            <Link to="/score" className="list-group-item list-group-item-action bg-dark text-primary"><FaHome /> ENTER A SCORE</Link>
                            <Link to={`/${user.assigned}/results`} className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> SCORE RESULTS</Link>
                            <Link to="/setup" className="list-group-item list-group-item-action bg-dark text-primary"><FaAt /> EDIT SCORECARD</Link>
                            <Link to="/results" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> MY SCORES</Link>
                        </div>
                    }
                    
                    <hr />
                    <h5 className="list-group-item list-group-item-action bg-dark text-primary">ADMIN</h5>
                    <Link to="/default" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> DEFAULT SCORECARD</Link>
                    <Link to="/teams" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> CREATE TEAMS</Link>
                    <Link to="/judges" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> ASSIGN JUDGES</Link>

                    <a className="list-group-item list-group-item-action bg-dark" href="/logout" onClick={e => logout()}><RiLogoutCircleLine /> LOG OUT</a>
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