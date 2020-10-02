import React from 'react'
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import LoginForm from "../components/LoginForm"

const Explore = ({user, setUser, posts, setPosts, addPost}) => {

    return(
        <div className="col-lg-12 p-0">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    {user !== null
                        ?<PostForm user={user} addPost={addPost}/> 
                        :<LoginForm user={user} setUser={setUser}/>
                    }
                </li>
            </ul>
            <PostList posts={posts} setPosts={setPosts} user={user} setUser={setUser}/>
        </div>
    )
}

export default Explore