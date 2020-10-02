import React, { useState, useEffect } from 'react'
import TagList from "../components/TagList"

import postService from '../services/posts'

const TrendingTags = () => {
    const [trending, setTrending] = useState([])
    
    useEffect(() => {
        postService.getPopular()
            .then((posts) => {
                setTrending(posts)
            })
    },[]);

    return (
        <div>
            <h6 className="p-3 d-block">TRENDING</h6>
            <TagList posts={trending} />
        </div> 
    )
}

export default TrendingTags