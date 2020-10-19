/* eslint-disable react/prop-types */
import React from "react";
import Moment from 'react-moment';
import { FaTrashAlt} from "react-icons/fa";

const ResultItem = ({score, user, deleteResult}) => {  

  return (
    <li className="list-group-item">
          <small className="text-muted"><Moment fromNow ago>{score.created}</Moment> ago</small>
          <h5>{score.team}</h5>
          {score.score} 
          <button className="btn btn-sm btn-outline-danger" onClick={e => deleteResult(score)}><FaTrashAlt /></button>
    </li>
  )

}

export default ResultItem