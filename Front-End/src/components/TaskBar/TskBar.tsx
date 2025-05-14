import { Button, Flex } from '@chakra-ui/react'
import { Task } from './ClassTask'
import { useContext, useRef, useState } from 'react';
import LoginInput from '../LoginInput/LoginInput';
import { MdAddTask } from 'react-icons/md';
import { TaskContext } from '../../context/TaskContext';

const TskBar = () => {
    const [novaTarefa, setNovaTarefa] = useState("");
    const [deadline, setDeadline] = useState<Date>();
    const [repetitions, setRepetitions] = useState<number>();
    const [estimedTime, setEstmedTime] = useState<number>();
    const ref = useRef<HTMLInputElement>(null);
    const {addTask} = useContext(TaskContext);

    const insertTask = () =>{
        const task = new Task( novaTarefa, 0, Number(selectedTab), deadline, repetitions, estimedTime);
        if (ref.current) {
            ref.current.focus();
        }
        addTask(task);
    }

    return (
        <Flex direction={"Column"} w={{base:"200px", sm: "400px"}}>
            <LoginInput labelInput={"Tarefa"} width={{base:"200px", sm: "380px"}} onChange={setNovaTarefa} type={"Text"} value={novaTarefa} />
            <Flex gap={2}  direction={{base: "column", sm:"row"}}alignItems={'end'} justifyContent={'space-between'} >
                <LoginInput labelInput={"Horas (Qnt)"} width={{base:"200px", sm: "70px"}} onChange={setEstmedTime} type={"Number"} value={estimedTime} />
                <LoginInput labelInput={"Repetições"} width={{base:"200px", sm: "70px"}} onChange={setRepetitions} type={"Number"} value={repetitions} />
                <LoginInput labelInput={"Data Limite"} width={{base:"200px", sm: "130px"}} onChange={setDeadline} type={"Date"} value={deadline} />
                <Button
                    onClick={() => insertTask()}
                    disabled={!novaTarefa.trim()}
                    bg={'lightgreen'}
                >
                    < MdAddTask />
                </Button>
            </Flex>
        </Flex>
    )
}
export default TskBar;
