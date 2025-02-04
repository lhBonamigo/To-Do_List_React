import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState({});
    const [logged, setLogged] = useState(false);
    return(
        <UserContext.Provider value={{user, setUser, logged, setLogged}}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;