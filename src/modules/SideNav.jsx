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
                    <Link to="/" className="list-group-item list-group-item-action bg-dark text-primary"><FaHome /> EXPLORE</Link>
                    <Link to={`/${user.username}/follows`} className="list-group-item list-group-item-action bg-dark text-primary"><FaPlus /> FOLLOWS</Link>
                    <Link to={`/${user.username}/likes`} className="list-group-item list-group-item-action bg-dark text-primary"><FaRegHeart /> LIKES</Link>
                    <Link to={`/mentions/${user.username}`} className="list-group-item list-group-item-action bg-dark text-primary"><FaAt /> MENTIONED</Link>
                    <Link to="/profile" className="list-group-item list-group-item-action bg-dark text-primary"><FaUserEdit /> PROFILE</Link>
                    <a className="list-group-item list-group-item-action bg-dark text-primary" href="/logout" onClick={e => logOut(e)}><RiLogoutCircleLine /> LOG OUT</a>
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