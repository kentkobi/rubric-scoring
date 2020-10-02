import React from 'react'

const UserCard = ({user}) => { 
    return (
        <div className="text-center">
            <div className="p-3">
                <img className="m-3 mr-4 ml-4 mx-auto rounded-circle border bg-white" src={user.avatar} alt="" width="100%" />
                <h5 className="mb-0 mx-auto">{user.name}</h5><small className="m-0 text-muted mx-auto">@{user.username}</small>
            </div>

            <div className="d-flex">
                <div className="p-2 flex-fill border">
                    <strong>{user.posts}</strong> 
                    <small className="text-muted d-block">Posts</small>
                </div>
                <div className="p-2 flex-fill border">
                    <strong>{user.followers}</strong> 
                    <small className="text-muted d-block">Followers</small>
                </div>
                <div className="p-2 flex-fill border">
                    <strong>{(user.following && user.following.size) || 0}</strong> 
                    <small className="text-muted d-block">Following</small>
                </div>
            </div>
            <hr />
        </div>
    )
}
export default UserCard