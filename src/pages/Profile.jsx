import React, {useState, useEffect } from 'react'
import userService from '../services/users'
import postService from '../services/posts'
import {useParams} from 'react-router-dom'
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import UserCard from "../components/UserCard"
import LoginForm from "../components/LoginForm"

const UserProfile = ({user, setUser, addPost}) => {
    const [profile, setProfile] = useState('')
    const [profilePosts, setProfilePosts] = useState('')
    const username = useParams().username

    useEffect(() => {
        userService.getByUsername(username)
            .then((data) => {
                setProfile(data)
            })
        postService.getByUsername(username)
            .then((data) => {
                setProfilePosts(data)
            })
    }, [username])
 
    return(
        <div className="row m-0">
            <div className="col-lg-9 p-0">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        {user !== null
                            ?<PostForm user={user} content={'@'+username+' '} addPost={addPost}/> 
                            :<LoginForm user={user} setUser={setUser}/>
                        }
                    </li>
                </ul>
                <PostList posts={profilePosts} user={user} setUser={setUser} setPosts={setProfilePosts}/>
            </div>
            <div className="col-lg-3 flex-grow-1 order-first order-lg-0 p-0"><UserCard user={profile}/></div>
        </div>
    )
}

export default UserProfile