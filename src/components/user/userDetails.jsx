import React from 'react'
import { useLocation } from 'react-router-dom';

const UserDetails = () => {
    const { state } = useLocation();
    return (
        <div>
            <p>{state.name}</p>
            <p>{state.email}</p>
            <p>{state.date_created}</p>

        </div>
    )
}

export default UserDetails