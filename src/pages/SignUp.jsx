import React from 'react'
import RegisterForm from "../components/RegisterForm"

const UserProfile = ({user, setUser, addPost}) => {
    return(
        <div className="row mx-0 my-3 pb-3">
            <div className="col-lg-12">
                <ul className="list-group mb-3 list-group-flush border rounded">
                    <li className="list-group-item">
                        <RegisterForm user={user} setUser={setUser}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserProfile