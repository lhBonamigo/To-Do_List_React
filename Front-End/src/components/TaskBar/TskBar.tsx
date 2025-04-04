import { Button, Flex } from '@chakra-ui/react'
import { Task } from './ClassTask'
import { FormEvent, useContext, useRef, useState } from 'react';
import usePost from '../../hooks/usePost';
import LoginInput from '../LoginInput/LoginInput';
import { MdAddTask } from 'react-icons/md';
import {UserContext} from '../../hooks/UserContext';

const TskBar = () => {
    const [novaTarefa, setNovaTarefa] = useState("");
    const [deadline, setDeadline] = useState<Date>();
    const [repetitions, setRepetitions] = useState<number>();
    const [estimedTime, setEstmedTime] = useState<number>();
    const { httpConfigPost } = usePost('https://api-todo-ckia.onrender.com/task/add');
    const ref = useRef<HTMLInputElement>(null);
    const {selectedTab, userID, Getget} = useContext(UserContext);

    const adicionar1 = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!novaTarefa.trim()) return;

        const task = new Task(userID, novaTarefa, 0, Number(selectedTab), deadline, repetitions, estimedTime);
        httpConfigPost(task, "POST");
        setNovaTarefa("");

        if (ref.current) {
            ref.current.focus();
        }
        Getget()
    }

    return (
        <form onSubmit={adicionar1}>
            <LoginInput labelInput={"Tarefa"} width='30vw' onChange={setNovaTarefa} type={"Text"} value={novaTarefa} />
            <Flex gap={2} alignItems={'end'} justifyContent={'space-between'} p={'.5em 1em'}>
                <LoginInput labelInput={"Horas (Qnt)"} width='70px' onChange={setEstmedTime} type={"Number"} value={estimedTime} />
                <LoginInput labelInput={"Repetições"} width='70px' onChange={setRepetitions} type={"Number"} value={repetitions} />
                <LoginInput labelInput={"Data Limite"} width='130px' onChange={setDeadline} type={"Date"} value={deadline} />
                <Button
                    type="submit"
                    value="Adicionar"
                    disabled={!novaTarefa.trim()}
                    bg={'lightgreen'}
                >
                    < MdAddTask />
                </Button>
            </Flex>
        </form>
    )
}
export default TskBar;
