import React, { useState } from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)

    function login(email, password) {
        setAuthUser({ name: email })
    }
    function logout(email, password) {
        setAuthUser(null)
    }

    const value = {
        authUser,
        login,
        logout
    }



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider