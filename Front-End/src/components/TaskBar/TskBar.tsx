import { Button, Flex, Input } from '@chakra-ui/react'
import { Props, Task } from './ClassTask'
import { FormEvent, useRef, useState } from 'react';
import usePost from '../../hooks/usePost';
import LoginInput from '../LoginInput/LoginInput';

const TskBar = () => {
    const [novaTarefa, setNovaTarefa] = useState("");
    const [deadline, setDeadline] = useState<Date|null>(null);
    const [repetitions, setRepetitions] = useState(0);
    const { httpConfigPost } = usePost('https://api-todo-ckia.onrender.com/task/add');
    const ref = useRef<HTMLInputElement>(null);

    const adicionar1 = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!novaTarefa.trim()) return;
    
        const task = new Task(); 
        //httpConfigPost(task, "POST");
        setNovaTarefa("");
    
        if (ref.current) {
          ref.current.focus();
        }
    }
    return (
        <form onSubmit={adicionar1}>    
            <LoginInput labelInput={"Tarefa"} onChange={setNovaTarefa} type={"Text"} value={novaTarefa}/>
            <LoginInput labelInput={"Tempo Estimado"} onChange={setNovaTarefa} type={"Number"}/>
            <LoginInput labelInput={"Repetições"} onChange={setNovaTarefa} type={"Number"}/>
            <LoginInput labelInput={"Data Limite"} onChange={setNovaTarefa} type={"Date"}/>
            {/* <LoginInput labelInput={""} onChange={setNovaTarefa} type={"Text"}/> */}
            <Button
                type="submit"
                value="Adicionar"
                disabled={!novaTarefa.trim()}
                w={"10%"}
                my={'auto'}
                mb={"2em"}
                className="submit-button"
                bg={"white"}
                ml={".5em"}
            >
                +
            </Button>
        </form>
    )
}
export default TskBar;
