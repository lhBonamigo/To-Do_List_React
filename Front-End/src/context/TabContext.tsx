import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Tab } from "../components/Tabs/classTab";
import usePut from "../hooks/usePut";
import useGet from "../hooks/useGet";
import usePost from "../hooks/usePost";
import useDelete from "../hooks/useDelete";
import { UserContext } from "./UserContext";

export const TabContext = createContext<TabContextTypes>({} as TabContextTypes);

interface TabContextTypes {
    removeTab: (tabToRemove: Tab) => void,
    addTab: (tabToAdd: Tab) => void,
    updateTab: (tabToUpdate: Tab) => void,
    tabs: Tab[]
    selectedTab: string,
    setSelectedTab: Dispatch<SetStateAction<string>>,
}

interface TabContextProviderProps {
    children: ReactNode;
}

export const TabContextProvider = ({ children }: TabContextProviderProps) => {
    const { userID, setNotification } = useContext(UserContext);
    const [tabs, setTabs] = useState<Tab[]>([]);
    const { httpConfigPut: putTabs, errorPut: putErrorTabs } = usePut<Tab>(`https://api-todo-ckia.onrender.com/tabs/update`);
    const { dataGet: tabsData, httpConfigGet: getTabs, error: getErrorTabs } = useGet<Tab[]>(`https://api-todo-ckia.onrender.com/tabs/tabs?id=${userID}`);
    const { httpConfigPost: postConfigTabs, errorPost: postErrorTabs, dataPost: postResponseTabs } = usePost<Tab>('https://api-todo-ckia.onrender.com/tabs/add');
    const [selectedTab, setSelectedTab] = useState<string>('0');
    const { httpConfigDel: deleteTab } = useDelete();

    const addTab = (tabToAdd: Tab) => {
        if (!tabToAdd.name) return
        postConfigTabs(tabToAdd, "POST");
    }

    const removeTab = (tabToRemove: Tab) => {
        const filteredtabs = tabs.filter((tab: Tab) => tab.id !== tabToRemove.id);
        setTabs(filteredtabs);
        deleteTab(`https://api-todo-ckia.onrender.com/tabs/delete?id=${tabToRemove.id}`);
    }

    const updateTab = (tabToUpdate: Tab) => {
        putTabs(tabToUpdate, "PUT");
    }

    useEffect(() => {
        setTabs(tabsData ? tabsData : []);
    }, [tabsData])

    useEffect(()=>{
       // setAllTasks((prevTarefas: Task[]) => {
            // rever para adicionar a task retornada no post
       // })
    },[postResponseTabs])

    useEffect(() => {
        if (putErrorTabs) setNotification(putErrorTabs);
        if (getErrorTabs) setNotification(getErrorTabs);
        if (postErrorTabs) setNotification(postErrorTabs);
        setTimeout(() => {
            setNotification("");
        }, 3000);
    }, [getErrorTabs, putErrorTabs, postErrorTabs])

    useEffect(() =>{
        getTabs();
    },[userID])

    return (
        <TabContext.Provider value={{ removeTab, addTab, updateTab, tabs, selectedTab, setSelectedTab }}>
            {children}
        </TabContext.Provider >
    );
}

export default TabContextProvider;