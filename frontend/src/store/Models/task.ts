import prerequisite from "./prerequisite";

type Task = {
  id: string;
  name: string;
  prerequisites: prerequisite[];
  files: any[];
};

export default Task;

export const taskUpdate = {
  name: "updateTask/name",
  addPrerequisite: "updateTask/addPrerequisite",
  updatePrerequisite: "updateTask/updatePrerequisite",
};
