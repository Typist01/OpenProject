import task from "./task"

type project = {
    id: string;
    name: string;
    tasks: task[];
    author: string;
    createdAt: Date;
    LastUpdatedAt: Date;
}

export default project