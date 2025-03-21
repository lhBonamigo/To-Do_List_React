export class Task{
    id: number;
    status: number;
    content: string;
    tab_task: number;
    clock?: number;
    deadline?: Date;
    Repetitions?: number;
    estimatedTime?: number;
    constructor(id: number, content: string,  status: number, tab_task:number, deadline?: Date, Repetitions?: number, estimatedTime?: number, clock?: number){
        this.id = id;
        this.deadline = deadline;
        this.Repetitions = Repetitions;
        this.estimatedTime = estimatedTime;
        this.content = content;
        this.status = status;
        this.clock = clock;
        this.tab_task = tab_task;
    }
}