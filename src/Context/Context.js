import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const Context = ({children}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (name, image) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        });
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => unsubscribe;
    },[user])

    const userInfo ={
        user,
        setUser,
        loading,
        setLoading,
        createNewUser,
        updateUser,
        loginUser,
        googleSignin,
        logOutUser, 
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