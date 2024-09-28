//we are creating this, to use the usecontext hook in other areas of the app, as well as keep consistent status of the user through out the app
import { createContext, useEffect, useReducer } from "react";
import SessionReducer from "./SessionReducer"; 

const INITIAL_USER_STATE = { 
  sessionUser: (() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);  
      } catch (error) {
        console.error("Failed to parse from localStorage,user undefined", error);
        return null;  
      }
    }
    return null;  
  })(),
};  

export const SessionContext = createContext(INITIAL_USER_STATE);
//this creates a context with the users initial state 
export const SessionContextProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(SessionReducer, INITIAL_USER_STATE); //provides to children, the methods of state and dispatch
   //state is the current state, dispatch is for updating that state,
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.sessionUser));
  }, [state.sessionUser]);

  return (
    <SessionContext.Provider value={{ sessionUser: state.sessionUser, dispatch }}>
      {children}
    </SessionContext.Provider>
  );
};