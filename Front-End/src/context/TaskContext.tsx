import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Task } from "../components/TaskBar/ClassTask";
import useGet from "../hooks/useGet";
import usePut from "../hooks/usePut";
import { UserContext } from "./UserContext";
import useDelete from "../hooks/useDelete";
import usePost from "../hooks/usePost";

export const TaskContext = createContext<TaskContextTypes>({} as TaskContextTypes);

interface TaskContextTypes {
    addTask: (newTask: Task) => void,
    removeTask: (taktToDelete: Task) => void,
    updateTask: (taskToUpdate: Task) => void,
    handleCheckboxChange: (id: number) => void,
    allTasks: Task[],
}

interface TaskContextProviderProps {
    children: ReactNode;
}

export const TaskContextProvider = ({ children }: TaskContextProviderProps) => {
    const { setNotification } = useContext(UserContext);
    const { httpConfigPost: postConfigureTask, dataPost: postResponseTask, errorPost: postErrorTask } = usePost<Task>(`https://api-todo-ckia.onrender.com/task/add`);
    const { httpConfigPut: putConfigureTask, errorPut: putErrorTask } = usePut<Task>(`https://api-todo-ckia.onrender.com/task/update`);
    const { dataGet: tasksData, httpConfigGet: getConfigureTask, error: getErrorTask } = useGet<Task[]>(`https://api-todo-ckia.onrender.com/task/tasks`);
    const { httpConfigDel: deleteTask } = useDelete();
    const [allTasks, setAllTasks] = useState<Task[]>([]);

    const orderTasks = () => {
        const checkedTask = allTasks.filter((task: Task) => task.status === 1);
        const unCheckedTask = allTasks.filter((tasks: Task) => tasks.status != 1);
        const ordened = [...unCheckedTask, ...checkedTask];
        setAllTasks(ordened);
    }

    const addTask = (newTask: Task) => {
        if (!newTask.content.trim()) return;
        setAllTasks((prevTarefas: Task[]) => {
            return [...prevTarefas, newTask];
        })

        postConfigureTask(newTask, "POST");
        getConfigureTask("GET");  //aqui preciso ver se o melhor método é fazer um get para atualizar a lista com id corretamente.
        orderTasks();
    }

    const removeTask = (taktToDelete: Task) => {
        const filteredTasks = allTasks.filter((tarefa: Task) => tarefa.id !== taktToDelete.id);
        deleteTask(`https://api-todo-ckia.onrender.com/task/delete?id=${taktToDelete.id}`);
        setAllTasks(filteredTasks);
        orderTasks();
    }

    const updateTask = (taktToUpdate: Task) => {
        putConfigureTask(taktToUpdate, "PUT");
        orderTasks();
    }

    const handleCheckboxChange = (id: number) => {
        setAllTasks((prevTarefas: Task[]) => {
            const novasTarefas = prevTarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, status: tarefa.status === 0 ? 1 : 0 } : tarefa
            );
            const tarefaAtualizada = novasTarefas.find((tarefa) => tarefa.id === id);

            if (tarefaAtualizada) {
                const body = {
                    id,
                    status: tarefaAtualizada.status,
                    content: tarefaAtualizada.content,
                    tab_task: tarefaAtualizada.tab_task,
                    deadline: tarefaAtualizada.deadline,
                    estimatedTime: tarefaAtualizada.estimatedTime,
                    repetitions: tarefaAtualizada.Repetitions,
                };
                putConfigureTask(body, "PUT");
            }
            return novasTarefas;
        });
        orderTasks();
    };

    useEffect(()=>{
        setAllTasks(tasksData ? tasksData: []);
    },[tasksData])

    useEffect(()=>{
       // setAllTasks((prevTarefas: Task[]) => {
            // rever para adicionar a task retornada no post
       // })
    },[postResponseTask])

    useEffect(() => {
        if (putErrorTask) setNotification(putErrorTask);
        if (getErrorTask) setNotification(getErrorTask);
        if (postErrorTask) setNotification(postErrorTask);
        setTimeout(() => {
            setNotification("");
        }, 3000);
    }, [getErrorTask, putErrorTask, postErrorTask])

    useEffect(()=>{
        getConfigureTask("GET");
    },[])

    return (
        <TaskContext.Provider value={{ addTask, removeTask, updateTask, handleCheckboxChange, allTasks }}>
            {children}
        </TaskContext.Provider >
    );
}

export default TaskContextProvider;