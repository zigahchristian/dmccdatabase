import React, { createContext, useReducer, ReactNode } from "react";

// Default State
const defaultState = {
  currentmember: [],
  loading: true,
  memberError: "",
} as any;

// Create Context
export const CurrentMemberContext = createContext(defaultState);

// Declare User Context Provider Props
type MemberProviderProps = {
  children: ReactNode;
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, currentmember: action.payload, loading: false };
    case "FETCH_FAILED":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const CurrentMemberProvider = ({ children }: MemberProviderProps) => {
  const [{ loading, error, currentmember }, dispatch] = useReducer(reducer, {
    currentmember: [],
    loading: true,
    error: "",
  });
  return (
    <CurrentMemberContext.Provider
      value={{
        currentmember,
        loading,
        error,
        dispatch,
      }}
    >
      {children}
    </CurrentMemberContext.Provider>
  );
};

export default CurrentMemberProvider;
