import React from 'react'
import { Link } from 'react-router-dom'

const UserCardFollow = ({user}) => { 
    return (
        <div>
            <div className="media">
                <Link key={user.username} to={'/users/' + user.username}>
                    <img className="d-flex align-self-start mr-3 rounded-circle border" src={user.avatar} alt="" width="70" />
                </Link>
                <div className="media-body">
                    <h5 className="mb-0 mx-auto">{user.name}</h5><small className="m-0 text-muted mx-auto">@{user.username}</small>
                </div>
            </div>
        </div>   
    )
}
export default UserCardFollow