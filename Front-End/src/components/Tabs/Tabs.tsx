import { useContext, useEffect } from 'react'
import { Heading, List, Tabs, Text } from "@chakra-ui/react"
import { useState } from "react"
import { UserContext } from '../../hooks/UserContext.js';
import { Task } from '../TaskBar/ClassTask.js'
import { Tab } from './classTab.js'
import React from 'react';
import AddTabDialog from '../popover/AddTabDialog.js';
import DeleteTabDialog from '../popover/DeleteTabDialog.js';
import EditTabDialog from '../popover/EditTabDialog.js';
import Item from '../Item/item';
import { changeLocalStorageTab } from '../../services/storage/localstorage.js';

const Tabes = () => {

  const { tarefas, setTarefas, tabs} = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]?.id.toString());
  
  useEffect(() => {
    setTarefas(tarefas)
  },[tarefas]);

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      onValueChange={(e: any) => {
        setSelectedTab(e.value);
        changeLocalStorageTab("Tab", selectedTab);
        console.log("selectedTab", selectedTab);
      }}

    >
      <Tabs.List flex="1 1 auto">
        {tabs && tabs.map((tab: Tab) => (
          <Tabs.Trigger value={tab.id.toString()} key={tab.id}>
            {tab.name}{"  "}
            <EditTabDialog tabe={tab}/>
            <DeleteTabDialog id={tab.id}/>
          </Tabs.Trigger>
        ))}
        <AddTabDialog />
      </Tabs.List>

      <Tabs.ContentGroup>
        {tabs && tabs.map((tab: Tab) => (
          <Tabs.Content value={tab.id.toString()} key={tab.id}>
            <Heading size="xl" my="6">
              {tab.description? tab.description : null}
            </Heading>
            <Text>
              {tarefas.length > 0 ? (
                <List.Root>
                  {tarefas.map((task: Task) => (
                    task.tab_task.toString() === selectedTab ? (
                      <React.Fragment key={task.id}>
                        <List.Item h={'50px'} border={'1px solid white'} pl={`.3em`} mt={".5em"} display={"flex"} alignItems={"Center"}>
                          <Item task={task}/>
                        </List.Item>
                      </React.Fragment>) : (null)
                  ))}
                </List.Root>
              ) : (
                <p className="no-tasks">Nenhuma tarefa adicionada ainda.</p>
              )}
              {/* .map com todo as tasks da aba  */}
            </Text>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}
export default Tabes