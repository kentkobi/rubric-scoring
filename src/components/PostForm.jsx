import React, { useState } from "react";

const PostForm = ( {user, addPost, content} ) => {

    const [postContent, setPostContent] = useState(content)
    const updateField = (event) => {
        setPostContent(event.target.value)
    }

    const formHandler = (event) => {
        event.preventDefault()

        addPost({content: postContent})
        setPostContent('')
    }
    
    return (
        <div className="media">
            <img className="d-flex align-self-start mr-3 rounded-circle" src={user.avatar || "https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg"} width="70" alt="" />
            <div className="media-body">
                <form onSubmit={formHandler}>
                    <div className="input-group input-group-lg mb-3">
                        <input name="content" onChange={updateField} className="form-control" placeholder="What's happening?" defaultValue={postContent} required></input>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostForm