import { useContext } from 'react'
import { Task } from '../TaskBar/ClassTask'
import EditeDialog from '../popover/EditTaskDialog';
import DeleteDialog from '../popover/DeleteTaskDialog';
import { Text } from '@chakra-ui/react'
import React from 'react';
import { TaskContext } from '../../context/TaskContext';

interface Iprops {
    task: Task
}

const item = ({ task }: Iprops) => {
    const { handleCheckboxChange } = useContext(TaskContext);

    return (
        <>
            <input
                type="checkbox"
                checked={task.status === 1 ? true : false}
                onChange={() => handleCheckboxChange(Number(task.id))}
            />
            <Text className="text" w={"100%"} ml={".5em"}>
                {task.content}
            </Text>
            <EditeDialog tarefa={task} />
            <DeleteDialog taskToRemove={task} />
        </>
    )
}
export default React.memo(item);