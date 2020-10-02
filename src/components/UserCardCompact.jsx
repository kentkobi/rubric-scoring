import React  from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({user}) => { 
    return (
        <div className="border-bottom border-secondary">
            <Link to="/profile">
                <div className="media m-2">
                    <img className="d-flex align-self-start mr-3 rounded border border-dark bg-secondary" src={user.avatar} alt="" width="40" />
                    <div className="media-body">
                        <h6 className="mb-0 mx-auto text-white">{user.name}<small className="m-0 d-block text-muted mx-auto">@{user.username}</small></h6>
                    </div>
                </div>
            </Link>
        </div>   
    )
}
export default UserCard