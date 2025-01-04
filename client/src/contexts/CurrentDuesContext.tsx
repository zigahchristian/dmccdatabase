import React, { createContext, useReducer, ReactNode } from "react";

// Default State
const defaultState = {
  currentdues: [],
  loading: true,
  memberError: "",
} as any;

// Create Context
export const CurrentDuesContext = createContext(defaultState);

// Declare User Context Provider Props
type MemberProviderProps = {
  children: ReactNode;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, currentdues: action.payload, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const CurrentDuesProvider = ({ children }: MemberProviderProps) => {
  const [{ loading, error, currentdues }, dispatch] = useReducer(reducer, {
    currentdues: [],
    loading: true,
    error: "",
  });
  return (
    <CurrentDuesContext.Provider
      value={{
        currentdues,
        loading,
        error,
        dispatch,
      }}
    >
      {children}
    </CurrentDuesContext.Provider>
  );
};

export default CurrentDuesProvider;
