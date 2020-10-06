/* eslint-disable react/prop-types */
import React from "react";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FaTrashAlt, FaRegHeart } from "react-icons/fa";

const ResultItem = ({score, user, deleteFn}) => {  

  return (
    <li className="list-group-item">
          <small className="text-muted"><Moment fromNow ago>{score.created}</Moment> ago</small>
          {score.team}
          {score.score} {score.judge.name}
          <div className="pl-2 pt-2">
            {user && user.username === score.judge.username &&
              <button className="btn btn-sm btn-outline-danger text-danger" onClick={() => deleteFn(score)}><FaTrashAlt /></button>
            }
          </div>
    </li>
  )

}

export default ResultItem