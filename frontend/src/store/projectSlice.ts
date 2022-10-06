import { createSlice } from "@reduxjs/toolkit";
import task from "./Models/task";

interface projectState {
  id: string;
  tasks: task[];
}

const projectSlice = createSlice({
  name: "project",
  initialState: <projectState>{
    id: "",
    tasks: [],
  },
  reducers: {
    addTask(state, action) {
      const id = action.payload.user + window.performance.now();
      const emptyTask: task = {
        id,
        name: "",
        prerequisites: [],
        files: [],
      };
      state.tasks = [...state.tasks, emptyTask];
    },
    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        task => task.id == action.payload.id
      );
      if (action.type === "updateTask/name") {
        state.tasks[taskIndex].name = action.payload.name;
      } else if (action.type === "updateTask/addFile") {
        state.tasks[taskIndex].files = [
          ...state.tasks[taskIndex].files,
          action.payload,
        ];
      } else if (action.type === "updateTask/addPrerequisite") {
        const newPrerequisite = {
          id: action.payload.prerequisite.id,
          name: "",
          body: "",
        };
        state.tasks[taskIndex].prerequisites = [
          ...state.tasks[taskIndex].prerequisites,
          newPrerequisite,
        ];
      } else if (action.type === "updateTask/updatePrerequisite") {
        const prerequisiteIndex = state.tasks[
          taskIndex
        ].prerequisites.findIndex(
          prerequisite => prerequisite.id == action.payload.prerequisite.id
        );
        state.tasks[taskIndex].prerequisites[prerequisiteIndex].body =
          action.payload.prerequisite.body;
      }
    },
  },
});

export const { addTask, updateTask } = projectSlice.actions;
export default projectSlice.reducer;

// const actions = projectSlice.actions;
// const projectSlicerReducer = projectSlice.reducer;
