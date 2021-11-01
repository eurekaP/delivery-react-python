import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import firebase from 'firebase/app';
import 'firebase/auth';

// action - state management
import { FIREBASE_STATE_CHANGED } from '../store/actions';

// project imports
import Loader from '../ui-component/Loader';
import config from '../config';

// firebase initialize
if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase);
}

// reducer - state management
const reducer = (state, action) => {
    switch (action.type) {
        case FIREBASE_STATE_CHANGED: {
            const { isLoggedIn, user } = action.payload;

            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                user
            };
        }
        default: {
            return { ...state };
        }
    }
};

// const
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

//-----------------------|| FIREBASE CONTEXT & PROVIDER ||-----------------------//

const FirebaseContext = createContext({
    ...initialState,
    firebaseEmailPasswordNewUser: () => Promise.resolve(),
    firebaseEmailPasswordSignIn: () => Promise.resolve(),
    firebaseGoogleSignIn: () => Promise.resolve(),
    logout: () => Promise.resolve()
});

export const FirebaseProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const firebaseEmailPasswordSignIn = (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    const firebaseGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithPopup(provider);
    };

    const firebaseEmailPasswordNewUser = async (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };

    const logout = () => {
        return firebase.auth().signOut();
    };

    useEffect(() => {
        return firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch({
                    type: FIREBASE_STATE_CHANGED,
                    payload: {
                        isLoggedIn: true,
                        user: {
                            id: user.uid,
                            email: user.email
                        }
                    }
                });
            } else {
                dispatch({
                    type: FIREBASE_STATE_CHANGED,
                    payload: {
                        isLoggedIn: false,
                        user: null
                    }
                });
            }
        });
    }, [dispatch]);

    if (!state.isInitialized) {
        return <Loader />;
    }

    return (
        <FirebaseContext.Provider
            value={{
                ...state,
                firebaseEmailPasswordNewUser,
                firebaseEmailPasswordSignIn,
                firebaseGoogleSignIn,
                logout
            }}
        >
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;
