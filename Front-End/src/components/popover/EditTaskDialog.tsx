import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react"
import { useContext, useState } from "react";
import { Task } from "../TaskBar/ClassTask";
import LoginInput from "../LoginInput/LoginInput";
import { TaskContext } from "../../context/TaskContext";

interface IpropComp {
  tarefa: Task,
  children: React.ReactNode
}

const EditeDialog = ({ tarefa, children }: IpropComp) => {
  const { updateTask } = useContext(TaskContext);
  const [content, setNovaTarefa] = useState(tarefa.content);
  const [deadline, setDeadline] = useState<Date | undefined>(tarefa.deadline);
  const [repetitions, setRepetitions] = useState<number | undefined>(tarefa.Repetitions);
  const [estimedTime, setEstmedTime] = useState<number | undefined>(tarefa.estimatedTime);
  const [tabName, setTabName] = useState<string>(tarefa.tab_task.name);

  console.log(tarefa.tab_task.name);
  
  const Update = (taskToAtualize: Task) => {
    const tab = {
      id: taskToAtualize.tab_task.id,
      name: tabName,
      user_id: taskToAtualize.tab_task.user_id,
      description: taskToAtualize.tab_task.description
    }

    const task = {
      content,
      deadline,
      estimedTime,
      repetitions,
      id: taskToAtualize.id,
      status: taskToAtualize.status,
      tab_task: tab,
    };
    updateTask(task);
  };

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
       {children}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg='#1F2630'>
            <Dialog.Header display={"flex"} direction={'column'} justifyContent={"space-between"} p={'1.5em'}>
              <Dialog.Title>Editar tarefa</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton/>
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <LoginInput labelInput="Tarefa" value={content} type="text" onChange={setNovaTarefa} />
              <Flex gap={`.7em`} p={'1em 3em'}>
                <LoginInput 
                  labelInput="Repetições" 
                  type="number" 
                  value={repetitions} 
                  onChange={setRepetitions} 
                />
                <LoginInput 
                  labelInput="Horas Estimadas" 
                  type="number" 
                  value={estimedTime} 
                  onChange={setEstmedTime} 
                />
                <LoginInput 
                  labelInput="Data Limite" 
                  type={'Date'} 
                  value={deadline?.toString()} 
                  onChange={setDeadline} 
                />
                <LoginInput 
                  labelInput="Tab" 
                  type={'select'} 
                  value={tabName} 
                  onChange={setTabName} 
                />
              </Flex>
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="green" onClick={() => Update(tarefa)}>Salvar</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default EditeDialog