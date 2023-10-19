// UserContext.js


import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Provide initial state as needed

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
