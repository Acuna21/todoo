export interface Task {
    id: number;
    title: string;
    dueDate: Date;
    people: User[];
    completed:boolean
}

export type TaskCreate = Omit<Task, 'id'>;

export interface User {
    id?:string
    name?: string;
    age?: number;
    skills?: string[];
    imageUrl?: string;
}