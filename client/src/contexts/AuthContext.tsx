import React, { createContext, useReducer, ReactNode } from "react";

// Default State
const defaultState = {
  authUser: [],
  loading: true,
  authError: "",
} as any;

// Create Context
export const AuthContext = createContext(defaultState);

// Declare User Context Provider Props
type AuthProviderProps = {
  children: ReactNode;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, authUser: action.payload, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false, authError: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [{ loading, authError, authUser }, dispatch] = useReducer(reducer, {
    authUser: [],
    loading: true,
    authError: "",
  });
  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        authError,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
