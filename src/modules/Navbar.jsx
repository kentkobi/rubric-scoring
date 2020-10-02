import React from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'
import { FaHome, FaUserEdit, FaPlus, FaAt, FaRegHeart } from "react-icons/fa"
import { RiLogoutCircleLine } from "react-icons/ri"

const UserNavbar = ({user, setUser}) => {
    const logOut = () => {
        usersService.logout()
        setUser(null)
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a className="nav-link" href="/"><FaHome /></a>
                </li>
                {user && user.name &&
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/profile" id="navbarDropdown" role="button" data-toggle="dropdown">
                            {user.name || 'Account'}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link to="/" className="dropdown-item"><FaHome /> Explore</Link>
                            <Link to={`/${user.username}/follows`} className="dropdown-item"><FaPlus /> Follows</Link>
                            <Link to={`/${user.username}/likes`} className="dropdown-item"><FaRegHeart /> Likes</Link>
                            <Link to={`/mentions/${user.username}`} className="dropdown-item"><FaAt /> Mentioned</Link>
                            <Link to="/profile" className="dropdown-item"><FaUserEdit /> Profile</Link>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item" onClick={() => logOut()}><RiLogoutCircleLine /> Log out</button>
                        </div>
                    </li>
                } 
            </ul>
            </div>
        </nav>
    )
}

export default UserNavbar