import React, { createContext, useReducer, ReactNode } from "react";

// Default State
const defaultState = {
  newmember: [],
  loading: true,
  memberError: "",
} as any;

// Create Context
export const RegisterContext = createContext(defaultState);

// Declare User Context Provider Props
type RegisterProviderProps = {
  children: ReactNode;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, newmember: action.payload, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const [{ loading, error, newmember }, dispatch] = useReducer(reducer, {
    newmember: [],
    loading: true,
    error: "",
  });
  return (
    <RegisterContext.Provider
      value={{
        newmember,
        loading,
        error,
        dispatch,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
