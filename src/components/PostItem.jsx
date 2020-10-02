/* eslint-disable react/prop-types */
import React from "react";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FaTrashAlt, FaRegHeart } from "react-icons/fa";

const Post = ({post, user, toggleFollow, toggleLike, deleteFn}) => {  
  const followLabel = ( user && user.follows && user.follows.includes(post.author.username) ) ? 'Following' : 'Follow';
  const likeLabel = ( user && post.likes.includes(user.username) ) ? 'Liked' : 'Like';

  const linkify = (word) => {
    if (word.match(/^@/)) {
      let url = '/mentions/' + word.substring(1)
      return <Link key={word} to={url}>{word}</Link>;
    }
    if (word.match(/^#/)) {
      let url = '/tags/' + word.substring(1)
      return <Link key={word} to={url}>{word}</Link>;
    } 

    return word
  }

  return (
    <li className="list-group-item" key={post.id}>
      <div className="media">
        <Link key={post.author.username} to={'/users/' + post.author.username}>
          <img className="d-flex align-self-start mr-3 rounded-circle border" src={post.author.avatar || "https://mdbootstrap.com/img/Photos/Others/placeholder1.jpg"} alt="" width="70" />
        </Link>
        <div className="media-body">
          <div className="d-flex">
            <div className="pr-2 pt-2 pl-0">
              <h5 className="mb-1">{post.author.name} </h5>
            </div>
            <div className="mr-auto pt-2">
              <small className="text-muted">@{post.author.username} · <Moment fromNow ago>{post.created}</Moment> ago</small>
            </div>
            <div className="pl-2 pt-2">
              {user && user.username !== post.author.username &&
                <button className="btn btn-sm btn-outline-primary mr-1" onClick={() => toggleFollow(post.author, user)}> {followLabel}</button>
              }

              {user &&
                <button className="btn btn-sm btn-outline-primary mr-1" onClick={() => toggleLike(post)}><FaRegHeart /> {likeLabel}</button>
              }

              {user && user.username === post.author.username &&
                <button className="btn btn-sm btn-outline-danger text-danger" onClick={() => deleteFn(post)}><FaTrashAlt /></button>
              }
            </div>
          </div>

          {post.content.split(/\s/).map((word, index) =>
              <span key={`tag-${index}`}>{linkify(word)} </span>
          )}
        </div>
      </div>
    </li>
  )

}

export default Post