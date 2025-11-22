import { Button, Icon, Menu, Portal } from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import EditeDialog from "../popover/EditTaskDialog";
import DeleteDialog from "../popover/DeleteTaskDialog";
import { Task } from "../TaskBar/ClassTask";

interface Iprops {
  task: Task
}

export const TaskMenu = ({ task }: Iprops) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant='outline' size="xs">
          <Icon>
            <MdMoreVert />
          </Icon>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg='#343E48' p='10px'>

            <EditeDialog tarefa={task}>
              <Menu.Item p='10px' value="edit0" closeOnSelect={false}>
                Editar Tarefa
              </Menu.Item>
            </EditeDialog>

            <DeleteDialog taskToRemove={task}>
              <Menu.Item p='10px' value="edit1" closeOnSelect={false}>
                Deletar Tarefa
              </Menu.Item>
            </DeleteDialog>

          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default TaskMenu;
