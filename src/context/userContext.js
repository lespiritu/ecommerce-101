import  { createContext } from "react";

// create a context object
// A context object as the name states is a data type of an object that can be used to storage information that can be shared to other components within the app.
// The context object is a different approach to passing information between components and allows easier access by avoiding the use of prop drilling.


const UserContext = createContext();
export const UserProvider = UserContext.Provider;
export default UserContext;