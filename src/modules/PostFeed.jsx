import React from 'react'
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import LoginForm from "../components/LoginForm"

const PostFeed = ({user, setUser, posts, setPosts, addPost}) => {
    return (
        <div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                {user !== null
                    ?<PostForm user={user} addPost={addPost}/> 
                    :<LoginForm user={user} setUser={setUser}/>
                }
                </li>
            </ul>
            
            <PostList user={user} setUser={setUser} posts={posts} setPosts={setPosts}/>
        </div>
    )
}

export default PostFeed