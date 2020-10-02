import React from 'react'
import Post from './PostItem'
import userService from '../services/users'
import postService from '../services/posts'
import {useParams} from 'react-router-dom'

const PostList = ({posts, user, setUser, setPosts}) => {
    const tag = useParams().tag
    const mention = useParams().mention

    if (mention) {
        posts = posts.filter(p => p.mentions && p.mentions.includes("@"+mention) )
    }

    if (tag) {
        posts = posts.filter(p => p.tags && p.tags.includes("#"+tag) )
    }

    const deletePost = (post) => {
        postService.delete(post.id, user)
            .then(data => {
                const updatedPosts = posts.filter(p => p.id !== post.id)
                setPosts(updatedPosts)
            })
    }

    const toggleFollow = (target, user) => {
        const follows = ( user.follows && user.follows.includes(target.username) ) 
            ? user.follows.filter( u => u !== target.username) 
            : user.follows.concat(target.username)
        const updatedUser = {...user, follows: follows}

        userService.update(updatedUser)
            .then(data => {
                console.log("updated User data...", data)
                setUser(data)
            })
    }

    const toggleLike = (post) => {
        const likes = ( post.likes.includes(user.username) ) ? post.likes.filter( u => u !== user.username) : post.likes.concat(user.username)
        const updatedPost = {...post, likes: likes}

        postService.update(updatedPost, user)
            .then(data => {
                const updatedPosts = posts.map(
                    post => post.id !== data.id ? post : data 
                )
                setPosts(updatedPosts)
            })
    }

    return(
        <ul className="list-group list-group-flush bg-white border rounded">
            {posts && posts.map((post) => (
                <Post key={post.id} post={post} user={user} toggleFollow={toggleFollow} toggleLike={toggleLike} deleteFn={deletePost}/>
            ))}
            {posts && !posts.length &&
                <li className="list-group-item text-muted text-center">
                    <h5>no posts found</h5>
                    <p>Start posting and engaging with the community!</p>
                </li>
            }
        </ul>
    )
}
export default PostList
