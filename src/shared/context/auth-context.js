import React, { createContext, useCallback, useState } from 'react';

const initialState = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};
export const UserContext = createContext(initialState);

const UserProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => setIsLoggedIn(true), []);
  const logout = useCallback(() => setIsLoggedIn(false), []);

  const value = { isLoggedIn, login, logout };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
