import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const Context = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(email, password);
    }

    const updateUser = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        });
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(email, password);
    }

    const loggOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })

        return () => unsubscribe;
    },[user])

    const userInfo ={
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        updateUser,
        loginUser,
        loggOutUser, 
    };

    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default Context;