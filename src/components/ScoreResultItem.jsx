/* eslint-disable react/prop-types */
import React from "react";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FaTrashAlt, FaRegHeart } from "react-icons/fa";

const ResultItem = ({index, result, user}) => {  

  return (
    <li className="list-group-item">
      <div className="card">
        <h5 className="card-header">
          #{index} {result.team}
        </h5>
        <div className="card-body">
          <h3>{result.total} pts</h3>
        </div>
        <div className="card-footer">

          <div className="d-flex  align-content-stretch">
            {result.breakdown && result.breakdown.map((sheet) => (
              <div className="p-2 flex-fill">
                <strong>{sheet.score} pts</strong>
                <div>{sheet.judge}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  )

}

export default ResultItem