import React from 'react'
import ProfileForm from "../components/ProfileForm"

const UserProfile = ({user, setUser, addPost}) => {
    return(
        <div className="row m-0">
            <div className="col-lg-12 p-0">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <ProfileForm user={user} setUser={setUser}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserProfile