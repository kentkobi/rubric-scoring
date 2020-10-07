/* eslint-disable react/prop-types */
import React from "react";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FaTrashAlt, FaRegHeart } from "react-icons/fa";

const ResultItem = ({result, user}) => {  

  return (
    <li className="list-group-item">
          {result.team}
          {result.total}
          {result.count} judges
    </li>
  )

}

export default ResultItem