import React from 'react'
import { Link } from 'react-router-dom';



const TagList = ({posts}) => {
    const tags = []      
    posts.map((post) => (
        post.tags && post.tags.map((tag) => (
            tags.push(tag)
        ))
    ))
    const uniqueTags = [...new Set(tags)]


    return(
        <ul className="list-group list-group-flush">
            {uniqueTags.map((tag, index) => (
                <li key={index} className="list-group-item bg-light">
                    <Link to={`/tags/${tag.substring(1)}`}>{tag}</Link>
                </li>
            ))}
        </ul>
    )
}
export default TagList
