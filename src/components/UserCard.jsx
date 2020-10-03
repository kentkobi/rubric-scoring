import React from 'react'

const UserCard = ({user}) => { 
    return (
        <div className="border-bottom border-secondary">
            <Link to="/profile">
                <h5 className="mb-0 mx-auto">{user.name}</h5>
                <p>{user.company}</p>
            </Link>
        </div>
    )
}
export default UserCard