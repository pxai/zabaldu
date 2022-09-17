import { createContext, useState, useReducer, useEffect } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const USER_ACTION_TYPES = {
  'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

export const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default: throw new Error('ACTION_NOT_DEFINED for user Reducer');
  }
}

export const INITIAL_STATE = {
  currentUser: null
};

export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);
  const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE)
  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
  }
  const value = { currentUser, setCurrentUser };


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
