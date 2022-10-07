import Task from "./task";

type project = {
  id: string;
  name: string;
  tasks: Task[];
  author: string;
  createdAt: Date;
  LastUpdatedAt: Date;
};

export default project;
