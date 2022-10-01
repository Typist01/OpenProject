import { createSlice } from "@reduxjs/toolkit"
import task from "./Models/task"


interface projectState {
    id: string;
    tasks: task[];
}
const projectSlice = createSlice({
    name: "project",
    initialState: {
        id: "0",
        tasks: []
    }
    reducers: {
        addTask(state, payload) {
            newTask = {payload}
                state.tasks = [...state.tasks, {}]
        }
    }

})