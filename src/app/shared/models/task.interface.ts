export interface Task {
    id: number;
    title: string;
    createdAt: Date;
    people: User[];
    completed:boolean
}

export interface User {
    id:string
    name?: string;
    age?: number;
    skills?: string[];
    imageUrl?: string;
}