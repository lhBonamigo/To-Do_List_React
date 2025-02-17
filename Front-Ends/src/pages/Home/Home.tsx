import React, { useEffect, useState, useRef, useContext } from "react";
import usePost from '../../hooks/usePost.js';
import { Field } from '../../components/ui/field.js';

import { Button, Heading, Input, Flex, Text, List } from '@chakra-ui/react';
import { UserContext } from '../../hooks/UserContext.js';
import useDelete from '../../hooks/useDelete.js';
import useGet from '../../hooks/useGet.js';
import usePut from '../../hooks/usePut.js';

const Home = () => {
  const { user } = useContext(UserContext);
  const [userID, setUserID] = useState(null);
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [deadline, setDeadline] = useState("0000-00-00");
  const [trigger, setTrigger] = useState(0);
  const { httpConfigPut } = usePut('https://api-todo-ckia.onrender.com/task/update');
  const { httpConfigPost } = usePost('https://api-todo-ckia.onrender.com/task/add');
  const { httpConfigDel } = useDelete('https://api-todo-ckia.onrender.com/task/delete');
  const { dataGet, httpConfigGet } = useGet(`https://api-todo-ckia.onrender.com/task/tasks?id=${userID}`);
  const ref = useRef(null);

  useEffect(() => {
    if (user && user.results && user.results[0]) {
      setUserID(user.results[0].id);
    }
  }, [user]);

  const orderTasks = () =>{
    const checkedTask = tarefas.filter((task) => task.status === 1);
    const unCheckedTask = tarefas.filter((tasks) => tasks.status != 1);

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
      orderTasks(tarefas);
    }
  }, [tarefas]);

  useEffect(() => {
    if (userID) {
      httpConfigGet("GET");
    }
  }, [trigger, userID]);
  
  const adicionar1 = (e) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    const task = { novaTarefa, deadline, userID, states: false };
    httpConfigPost(task, "POST");
    setNovaTarefa("");
    setTrigger((trigger) => trigger + 1);

    if (ref.current) {
      ref.current.focus();
    }
  };

  const remove = (tarefaParaRemover) => {
    const filteredTarefas = tarefas.filter((tarefa) => tarefa.id !== tarefaParaRemover.id);
    setTarefas(filteredTarefas);
    setTrigger((prev) => prev + 1);

    const task = { id: tarefaParaRemover.id };
    httpConfigDel(task, "DELETE");
  };

  const handleCheckboxChange = (id) => {
    setTarefas((prevTarefas) => {
      const novasTarefas = prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, status: tarefa.status === 0 ? 1 : 0 } : tarefa
      );
  
      const tarefaAtualizada = novasTarefas.find((tarefa) => tarefa.id === id);
  
      if (tarefaAtualizada) {
        const body = {
          id,
          status: tarefaAtualizada.status,
        };
        httpConfigPut(body, "PUT");
      }
  
      return novasTarefas;
    });
  };

  return (
    <Flex className="body">
      {user && user.results && user.results[0] ? (
        <Heading size={"4xl"}>Minha lista de tarefas</Heading>
      ) : (
        <Heading size={"5xl"}>Carregando...</Heading>
      )}

      <form onSubmit={adicionar1} className="form">
        <Field label={"Adicionar tarefa"} mt={"2em"}>
          <Input
            ref={ref}
            variant={"flushed"}
            mb={"1em"}
            required
            type="text"
            placeholder="Cozinhar Almoço"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
        </Field>
        {/* {<Field label={"Deadline"}>
          <Input
            type="date"
            variant={"flushed"}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="deadline-input"
          />
        </Field>} */}
        <Button
          type="submit"
          value="Adicionar"
          disabled={!novaTarefa.trim()}
          w={"10%"}
          my={'auto'}
          mb={"2em"}
          className="submit-button"
        >
          +
        </Button>
      </form>

      {tarefas.length > 0 ? (
        <List.Root>
          {tarefas.map((tarefa, index) => (
            <List.Item key={index} w={"90vw"} maxW={`900px`} background={"lightblue"} pl={`.3em`} mb={".2em"} mt={".5"} display={"flex"} alignItems={"Center"}>
              <input
                type="checkbox"
                checked={tarefa.status}
                onChange={() => handleCheckboxChange(tarefa.id)}
              />
              <Text className="text" w={"100%"} ml={".5em"}>
                {tarefa.task || tarefa.tarefa}
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
    </Flex>
  );
};

export default Home;
