import React from 'react'
import userService from '../services/users'
import { FaHome, FaUserEdit, FaPlus, FaAt, FaRegHeart } from "react-icons/fa"
import { RiLogoutCircleLine } from "react-icons/ri"
import { Link } from 'react-router-dom'

const UserSideNav = ({user, setUser}) => {
    const logOut = (event) => {
        event.preventDefault()
        
        userService.logout()
        setUser(null)
    }

    return(    
        <div>
            {user && user.name &&
                <div className="list-group list-group-flush">
                    <Link to="/score" className="list-group-item list-group-item-action bg-dark text-primary"><FaHome /> SCORING</Link>
                    <Link to={`/${user.company}/results`} className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> RESULTS</Link>
                    
                    <Link to="/setup" className="list-group-item list-group-item-action bg-dark text-primary"><FaAt /> CONFIG</Link>
                    <Link to="/profile" className="list-group-item list-group-item-action bg-dark text-primary"><FaUserEdit /> PROFILE</Link>
                    <hr />
                    <h5 className="list-group-item list-group-item-action bg-dark text-primary">ADMIN</h5>
                    <Link to="/" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> SCORE ACTIVITY</Link>
                    <Link to="/teams" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> TEAMS</Link>
                    <Link to="/teams" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> COMPANIES</Link>
                    <Link to="/teams" className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> JUDGES</Link>

                    <a className="list-group-item list-group-item-action bg-dark" href="/logout" onClick={e => logOut(e)}><RiLogoutCircleLine /> LOG OUT</a>
                </div>
            } 
            {!user &&
                <div className="list-group list-group-flush">
                    <Link to="/" className="list-group-item list-group-item-action bg-dark text-primary"><FaHome /> HOME</Link>
                    <Link to="/register" className="list-group-item list-group-item-action bg-dark text-primary"><FaUserEdit /> SIGNUP</Link>
                    <Link to="/login" className="list-group-item list-group-item-action bg-dark text-primary"><FaUserEdit /> LOG IN</Link>
                </div>
            }
        </div>
    )
}

export default UserSideNav