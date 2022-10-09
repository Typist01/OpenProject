import Task from "./task";

type Project = {
  id: string;
  name?: string;
  tasks: Task[];
  aim?: string;
  author?: string;
  createdAt?: Date;
  LastUpdatedAt?: Date;
};

export default Project;

export const projectUpdate = {
  name: "updateProject/name",
  aim: "updateProject/aim",
};
