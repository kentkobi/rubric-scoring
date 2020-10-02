import React from 'react'
import UserCardFollow from '../components/UserCardFollow'

const UserList = ({users}) => {

    return(
        <ul className="list-group list-group-flush bg-white">
            {users && users.map((user, index) => (
                <li key={index} className="list-group-item bg-light"><UserCardFollow key={user.id} user={user}/></li>
            ))}
        </ul>
    )
}
export default UserList
