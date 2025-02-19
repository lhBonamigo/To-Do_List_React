import { createContext, useState } from "react";
import { MycontextProps, MyProviderProps } from "./Interfaces";
export const UserContext = createContext({}as MycontextProps);

export const UserContextProvider = ({children}: MyProviderProps) =>{
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    return(
        <UserContext.Provider value={{user, setUser, logged, setLogged}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;