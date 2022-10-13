import { createSlice } from "@reduxjs/toolkit";
import Project, { projectUpdate } from "./Models/project";
import Task from "./Models/task";
import { taskUpdate } from "./Models/task";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    id: "",
    tasks: [],
  } as Project,
  reducers: {
    addTask(state, action) {
      console.log("add task called in redux");
      console.log(action);
      const id = "" + action.payload.user + window.performance.now();
      const emptyTask: Task = {
        id,
        name: "",
        prerequisites: [],
        files: [],
      };
      state.tasks = [...state.tasks, emptyTask];
    },
    updateTask(state, action) {
      console.log("update task called");
      console.log(action);
      const taskIndex = state.tasks.findIndex(
        task => task.id === action.payload.id
      );
      const payload = action.payload;
      if (payload.type === taskUpdate.name) {
        state.tasks[taskIndex].name = action.payload.name;
      } else if (payload.type === "updateTask/addFile") {
        state.tasks[taskIndex].files = [
          ...state.tasks[taskIndex].files,
          action.payload,
        ];
      } else if (payload.type === taskUpdate.addPrerequisite) {
        const newPrerequisite = {
          id: action.payload.id + window.performance.now(),
          name: "",
          body: "",
        };
        state.tasks[taskIndex].prerequisites = [
          ...state.tasks[taskIndex].prerequisites,
          newPrerequisite,
        ];
      } else if (payload.type === taskUpdate.updatePrerequisite) {
        const prerequisiteIndex = state.tasks[
          taskIndex
        ].prerequisites.findIndex(
          prerequisite => prerequisite.id === action.payload.prerequisite.id
        );
        state.tasks[taskIndex].prerequisites[prerequisiteIndex].body =
          action.payload.body;
      }
    },
    updateProject(state, action) {
      if (action.payload.type === projectUpdate.name) {
        state.name = action.payload.body;
      } else if (action.payload.type === projectUpdate.aim) {
        state.aim = action.payload.body;
      }
    },
  },
});

export const { addTask, updateTask, updateProject } = projectSlice.actions;
export default projectSlice.reducer;