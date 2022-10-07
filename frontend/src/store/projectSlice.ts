import { createSlice } from "@reduxjs/toolkit";
import Task from "./Models/task";
import { taskUpdate } from "./Models/task";

interface projectState {
  id: string;
  tasks: Task[];
}

const projectSlice = createSlice({
  name: "project",
  initialState: <projectState>{
    id: "",
    tasks: [],
  },
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
        task => task.id == action.payload.id
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
  },
});

export const { addTask, updateTask } = projectSlice.actions;
export default projectSlice.reducer;

// const actions = projectSlice.actions;
// const projectSlicerReducer = projectSlice.reducer;
