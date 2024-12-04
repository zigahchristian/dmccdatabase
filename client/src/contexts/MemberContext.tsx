import React, { createContext, useReducer, ReactNode } from "react";

// Default State
const defaultState = {
  members: [],
  loading: true,
  memberError: "",
} as any;

// Create Context
export const MemberContext = createContext(defaultState);

// Declare User Context Provider Props
type MemberProviderProps = {
  children: ReactNode;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, members: action.payload, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const MemberProvider = ({ children }: MemberProviderProps) => {
  const [{ loading, error, members }, dispatch] = useReducer(reducer, {
    members: [],
    loading: true,
    error: "",
  });
  return (
    <MemberContext.Provider
      value={{
        members,
        loading,
        error,
        dispatch,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
};

export default MemberProvider;
