import React, { useState } from "react";
import { getTokenFromCache } from "../utils/localStorage";

const initialState = {};
export const AuthContext = React.createContext(initialState);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: getTokenFromCache(),
    user: null,
  });

  const setAuthUser = (user) => {
    setAuth({ ...auth, user });
  };

  const unAuthenticate = () => {
    setAuth({
      token: null,
      user: null,
    });
  };
  const authenticate = (token) => {
    setAuth({
      token: token,
    });
  };
  return (
    <AuthContext.Provider
      value={{ ...auth, setAuthUser, unAuthenticate, authenticate }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
