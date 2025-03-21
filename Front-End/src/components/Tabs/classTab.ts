export class Tab{
    id: number;
    name: string;
    description?: string |undefined;
    constructor(id: number, name: string, description?:string){
        this.name = name
        this.id = id
        this.description = description
    }
}