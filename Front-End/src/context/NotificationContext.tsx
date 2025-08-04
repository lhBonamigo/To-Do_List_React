import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserContextProviderProps {
    children: ReactNode;
}

interface UserContextType {
    setNotification: Dispatch<SetStateAction<string>>,
    notification: string
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [notification, setNotification] = useState<string>('');

    return (
        <UserContext.Provider value={{setNotification, notification }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;