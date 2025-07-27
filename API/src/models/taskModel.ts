
export interface ITask {
    id?: number;
    content: string;
    deadline: string;
    user_id?: number;
    status: string;
    tab_task: string;
    repetitions: number;
    estimatedTime: number;
}