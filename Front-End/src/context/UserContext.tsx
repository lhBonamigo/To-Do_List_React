import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    userID: number,
    setUserID: Dispatch<SetStateAction<number>>,
    setNotification: Dispatch<SetStateAction<string>>,
    notification: string
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [userID, setUserID] = useState<number>(0);
    const [notification, setNotification] = useState<string>('');

    return (
        <UserContext.Provider value={{userID, setUserID, setNotification, notification }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;