import { DonutLarge, SystemSecurityUpdate } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { time } from "console";
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
    updateTaskName(state, action) {
      const taskIndex = state.tasks.findIndex(
        task => task.id == action.payload.id
      );
      state.tasks[taskIndex].name = action.payload.name;
    },
  },
});

const actions = projectSlice.actions;
const projectSlicerReducer = projectSlice.reducer;
