import React, { useContext, useEffect } from 'react'
import { Button, CloseButton, Heading, List, Tabs, Text } from "@chakra-ui/react"
import { useState } from "react"
import { LuPlus } from "react-icons/lu"
import useGet from '../../hooks/useGet'
import { getLocalStorage } from '../../services/storage/localstorage'
import { UserContext } from '../../hooks/UserContext.js';
import useDelete from '../../hooks/useDelete.js'
import usePut from '../../hooks/usePut.js'
import { Task } from '../TaskBar/ClassTask.js'

const uuid = () => {
  return Math.random().toString(36).substring(2, 15)
}

const Tabes = () => {
  const [userID, setUserID] = useState<number>(0);
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const { dataGet, httpConfigGet } = useGet(`https://api-todo-ckia.onrender.com/task/tasks?id=${userID}`);
  const { dataDel, httpConfigDel } = useDelete(`https://api-todo-ckia.onrender.com/task/Delete}`);
  const { dataPut, httpConfigPut } = usePut(`https://api-todo-ckia.onrender.com/task/Update}`);
  const [tabs, setTabs] = useState<Task[]>(tarefas)
  const [selectedTab, setSelectedTab] = useState<string | null>(tarefas[0].tab_task.toString())
  const { user } = useContext(UserContext);
    
    useEffect(() => {
      if (!user) {
        const id = getLocalStorage("id");
        setUserID(Number(id));
      }
      user && setUserID(user.id);
    }, [user]);
  const orderTasks = () => {
    const checkedTask = tarefas.filter((task: Task) => task.status === 1);
    const unCheckedTask = tarefas.filter((tasks: Task) => tasks.status != 1);

    const ordened = [...unCheckedTask, ...checkedTask];
    setTarefas(ordened);
  }
  useEffect(() => {
    if (dataGet) {
      setTarefas(dataGet);
    }
  }, [dataGet]);

  useEffect(() => {
    if (tarefas.length > 0) {
      orderTasks();
    }
  }, [tarefas]);

  useEffect(() => {
    if (userID) {
      httpConfigGet("GET");
    }
  }, [userID]);

  const remove = (tarefaParaRemover: Task) => {
    const filteredTarefas = tarefas.filter((tarefa) => tarefa.id !== tarefaParaRemover.id);
    setTarefas(filteredTarefas);

    const task = { id: tarefaParaRemover.id };
    httpConfigDel(task, "DELETE");
  };

  const handleCheckboxChange = (id: number) => {
    setTarefas((prevTarefas: Task[]) => {
      const novasTarefas = prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, status: tarefa.status === 0 ? 1 : 0 } : tarefa
      );

      const tarefaAtualizada = novasTarefas.find((tarefa) => tarefa.id === id);

      if (tarefaAtualizada) {
        const body = {
          id,
          status: tarefaAtualizada.status,
          content: tarefaAtualizada.content,
          tab_task: tarefaAtualizada.id
        };
        httpConfigPut(body, "PUT");
      }
      return novasTarefas;
    });
  };
  const addTab = () => {
    const newTabs = [...tabs]

    const uid = uuid()

    newTabs.push({
      id: 1,
      title: `Tab`,
      content: `Tab Body`,
    })

    setTabs(newTabs)
    setSelectedTab(newTabs[newTabs.length - 1].id)
  }

  const removeTab = (id: number) => {
    if (tabs.length > 1) {
      const newTabs = [...tabs].filter((tab) => tab.id !== id)
      setTabs(newTabs)
    }
  }

  return (
    <Tabs.Root
      value={selectedTab}
      variant="outline"
      size="sm"
      onValueChange={(e) => setSelectedTab(e.value)}
    >
      <Tabs.List flex="1 1 auto">
        {tabs.map((tarefa) => (
          <Tabs.Trigger value={tarefa.content} key={tarefa.id}>
            {tarefa.tab_task}{" "}
            <CloseButton
              as="span"
              role="button"
              size="2xs"
              me="-2"
              onClick={(e) => {
                e.stopPropagation()
                removeTab(tarefa.id)
              }}
            />
          </Tabs.Trigger>
        ))}
        <Button
          alignSelf="center"
          ms="2"
          size="2xs"
          variant="ghost"
          onClick={addTab}
        >
          <LuPlus /> Add Tab
        </Button>
      </Tabs.List>

      <Tabs.ContentGroup>
        {tabs.map((item: Task) => (
          <Tabs.Content value={item.content} key={item.id}>
            <Heading size="xl" my="6">
              {// item.content} {item.id}
}
            </Heading>
            <Text>
              {tarefas.length > 0 ? (
                <List.Root>
                  {tarefas.map((tarefa: Task, index) => (
                    <List.Item key={index} w={"90vw"} maxW={`900px`} border={'1px solid white'} background={"transparent"} pl={`.3em`} mt={".5em"} display={"flex"} alignItems={"Center"}>
                      <input
                        type="checkbox"
                        checked={tarefa.status === 1 ? true : false}
                        onChange={() => handleCheckboxChange(tarefa.id)}
                      />
                      <Text className="text" w={"100%"} ml={".5em"}>
                        {tarefa.content}
                      </Text>
                      <Button variant={"solid"} alignSelf={"end"} className="buttonX" onClick={() => remove(tarefa)}>
                        X
                      </Button>
                    </List.Item>
                  ))}
                </List.Root>
              ) : (
                <p className="no-tasks">Nenhuma tarefa adicionada ainda.</p>
              )}
              {/* .map com todo as tasks da aba */}
            </Text>
          </Tabs.Content>
        ))}
      </Tabs.ContentGroup>
    </Tabs.Root>
  )
}

export default Tabes
