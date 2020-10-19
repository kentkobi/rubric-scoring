import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const UserCard = () => { 
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div className="border-bottom border-secondary">
                <h5 className="text-white mb-0 mx-auto">{user.name}</h5>
                <p className="text-white">{user.email}</p>
            </div>
        )
    );
}
export default UserCard