import React, { useState, useEffect } from 'react'
import UserList from "../components/UserList"
import userService from '../services/users'

const WhoToFollow = ({user}) => {
    const [suggested, setSuggested] = useState([])
    
    useEffect(() => {
        if(user && user.username){
            userService.getSuggestedFollows( user.username )
            .then((users) => {
                setSuggested(users)
            })
        } else {
            userService.getSuggestedFollows()
            .then((users) => {
                setSuggested(users)
            })
        }
    },[user]);

    return (
        <div>
            <h6 className="p-3 m-0 d-block">WHO TO FOLLOW</h6>
            <UserList users={suggested} />
        </div>
    )
}

export default WhoToFollow