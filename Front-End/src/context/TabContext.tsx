import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Tab } from "../components/Tabs/classTab";
import useDelete from "../hooks/useDelete";
import { UserContext } from "./NotificationContext";
import useFetch from "../hooks/useFetch";

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
    const { setNotification } = useContext(UserContext);
    const [tabs, setTabs] = useState<Tab[]>([]);
    const { httpConfig: putTabs, error: putErrorTabs } = useFetch<Tab>(`https://api-todo-ckia.onrender.com/tabs/update`);
    const { data: tabsData, httpConfig: getTabs, error: getErrorTabs } = useFetch<Tab[]>(`https://api-todo-ckia.onrender.com/tabs/tabs`);
    const { httpConfig: postConfigTabs, error: postErrorTabs, data: postResponseTabs } = useFetch<Tab>('https://api-todo-ckia.onrender.com/tabs/add');
    const [selectedTab, setSelectedTab] = useState<string>('0');
    const { httpConfigDel: deleteTab } = useDelete();

    const addTab = (tabToAdd: Tab) => {
        if (!tabToAdd.name) return
        postConfigTabs("POST", tabToAdd);
    }

    const removeTab = (tabToRemove: Tab) => {
        const filteredtabs = tabs.filter((tab: Tab) => tab.id !== tabToRemove.id);
        setTabs(filteredtabs);
        deleteTab(`https://api-todo-ckia.onrender.com/tabs/delete?id=${tabToRemove.id}`);
        console.log(tabToRemove.id);
    }

    const updateTab = (tabToUpdate: Tab) => {
        putTabs("PUT", tabToUpdate);
    }

    useEffect(() => {
        setTabs(tabsData ? tabsData : []);
    }, [tabsData])

    // useEffect(()=>{
    //    setTabs((prevTab: Tab[]) => {
            
    //    })
    // },[postResponseTabs])

    useEffect(() => {
        if (putErrorTabs) setNotification(putErrorTabs);
        if (getErrorTabs) setNotification(getErrorTabs);
        if (postErrorTabs) setNotification(postErrorTabs);
        setTimeout(() => {
            setNotification("");
        }, 3000);
    }, [getErrorTabs, putErrorTabs, postErrorTabs])

    useEffect(() =>{
        getTabs("GET");
    },[])

    return (
        <TabContext.Provider value={{ removeTab, addTab, updateTab, tabs, selectedTab, setSelectedTab }}>
            {children}
        </TabContext.Provider >
    );
}

export default TabContextProvider;