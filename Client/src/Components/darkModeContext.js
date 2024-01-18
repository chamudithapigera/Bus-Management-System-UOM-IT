import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  darkMode: false,
};

//share the dark mode state and dispatch function across multiple components in application
export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  //the reducer to handle state updates based on dispatched actions
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    //wraps its children and passes down the context values
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
};