import React, {useState, useEffect, createContext} from 'react';
import Cookies from "js-cookie";
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [student, setStudent] = useState(null);
    const token = Cookies.get("authToken");

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (token) {
            const decoded = jwtDecode(token);
            setStudent(decoded);
        }
    }, []);

    const logIn = (token) => {
        Cookies.set("authToken", token);
        const decoded = jwtDecode(token);
        setStudent(decoded);
    }

    const logOut = ()  => {
        Cookies.remove("authToken");
        setStudent(null);
    }

    console.log(student);
    console.log(token);

    return (
        <AuthContext.Provider value={{ student, logIn, logOut, token }}>
            {children}
        </AuthContext.Provider>
    );
};
