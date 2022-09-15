import React, { createContext, useCallback, useState } from 'react';

const initialState = {
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
};
export const UserContext = createContext(initialState);

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const value = { isLoggedIn, login, logout, userId };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
