import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ContextData } from '../services/Context'

function PrivateRoute({ children }) {
    const { user } = useContext(ContextData)

    if (!user)
    {
        return <Navigate to="/login" />
    }
     if ( user != undefined || user != null ) {
        // not logged in so redirect to login page with the return url
        // return <Navigate to="/login" />
        return children;

    }
    else
    {
        return <Navigate to="/login" />
    }


}

export default PrivateRoute