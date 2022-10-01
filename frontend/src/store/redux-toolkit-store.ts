import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      return { ...state, counter: state.counter + 1 };
    },
    decrement(state) {
      state.counter--;
    },
  },
});

const store = configureStore({
  reducer: slice.reducer,
});

export const actions = slice.actions;
export default store;

// const store = createStore(counterSlice.reducer);

// function reducerOne(action: { type: string }, state = { myVar: "" }) {
//   if (action.type === "one") {
//     return { ...state, myVar: "one sent" };
//   }
//   if (action.type === "onedottwo") {
//     return { ...state, myVar: "two sent" };
//   }
// }
// let one: (
//   action: { type: string },
//   state?: { myVar: string }
// ) => { myVar: string } | undefined = reducerOne;
// export const store = configureStore({
//   reducer: {
//     one
//   },
// });
