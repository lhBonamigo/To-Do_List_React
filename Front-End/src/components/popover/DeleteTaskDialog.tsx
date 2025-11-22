import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { useContext } from "react";
import { Task } from "../TaskBar/ClassTask";
import { TaskContext } from "../../context/TaskContext";

interface IpropComp {
  taskToRemove: Task,
  children: React.ReactNode;
}

const DeleteDialog = ({ taskToRemove, children }: IpropComp) => {
  const { removeTask } = useContext(TaskContext);

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        {children}
      </Dialog.Trigger>
      <Portal >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg='#1F2630'>
            <Dialog.Header
              display={"flex"}
              direction={'column'}
              justifyContent={"space-between"}
              p={'1.5em'}
            >
              <Dialog.Title>Tem certeza?</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body p={'1em'}>
              <p>
                Esta ação não poderá ser desfeita.
              </p>
            </Dialog.Body>
            <Dialog.Footer p={'1.5em'}>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="red"
                  onClick={() => removeTask(taskToRemove)}
                >
                  Excluir
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
export default DeleteDialog