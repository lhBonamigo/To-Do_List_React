import { Dispatch, ReactNode, SetStateAction } from "react";

export type MycontextProps = {
    user: {
        results: string[]
    },
    setUser: Dispatch<SetStateAction<{}>>,
    logged: boolean,
    setLogged: Dispatch<SetStateAction<boolean>>
};


export interface MyProviderProps{
    children: ReactNode;
};
