import { useContext } from 'react'
import { Task } from '../TaskBar/ClassTask'
import { Checkbox, Flex, Text } from '@chakra-ui/react'
import React from 'react';
import { TaskContext } from '../../context/TaskContext';
import {TaskMenu} from '../../components/TaskMenu/TaskMenu';

interface Iprops {
    task: Task
}

const item = ({ task }: Iprops) => {
    const { handleCheckboxChange } = useContext(TaskContext);

    return (
        <Flex 
            justifyContent='space-between' 
            w='100%'
            height='100%'
            bg='#343E48'
            p='25px'
            borderRadius="2xl"
            boxShadow='sm'
        >

            <Checkbox.Root
                checked={task.status === 1 ? true : false} 
                onChange={() => handleCheckboxChange(Number(task.id))}
            >
                <Checkbox.HiddenInput />
                <Checkbox.Control border='1px solid #B5BDC8' />
                <Checkbox.Label>
                    <Text 
                        className={task.status === 1 ? 'risked' : "text"} 
                        w="100%"
                    >
                        {task.content}
                    </Text>
                </Checkbox.Label>
            </Checkbox.Root>
            
           <Flex>
                <TaskMenu task={task}/>                
           </Flex>
        </Flex>
    )
}
export default React.memo(item);