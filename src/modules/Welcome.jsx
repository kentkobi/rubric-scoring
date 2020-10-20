import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { FaArrowLeft } from "react-icons/fa"

const Welcome = ({user}) => {
    const {isAuthenticated} = useAuth0()

    return(    
        <div className="card welcome">
            {isAuthenticated &&
                <div>
                    <div className="card-header">
                        <h3>Thank you for getting involved</h3>
                    </div>
                    <div className="card-body">
                        <p>This program aims to develop students beyond the classroom, 
                            utilising theoretical knowledge into a 'real-world' and practical experience.</p>

                        {user && user.assigned &&
                            <div>
                                <p>You've been assigned to judge for {user.assigned}.</p>
                                <p>From the navigation, you'll be able to edit your 
                                group's scoring rubric and enter your scores on the day</p>
                            </div>
                        }
                        {user && !user.assigned &&
                            <div>
                                <p>Before the event, You will be assigned to a judging group, and you'll be able to edit your 
                                group's scoring rubric and enter your scores on the day</p>
                            </div>
                        }
                    </div>
                </div>
            } 
            {!isAuthenticated &&
                <div>
                    <div className="card-header">
                        <h3>Welcome!</h3>
                    </div>
                    <div className="card-body">
                        <p>This site is for the judges of Univative.</p>
                        <p>Here you will be able to edit your judging rubric and enter your scores on the day.</p>
                        <FaArrowLeft /> Choose LOGIN to begin!
                    </div>
                </div>
            }
        </div>
    )
}

export default Welcome