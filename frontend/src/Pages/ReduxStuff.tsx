import { actions } from "../store/redux-toolkit-store";
import { useDispatch, useSelector } from "react-redux";
import React from "react"
actions.decrement();

const ReduxStuff = () => {
  const dispatch = useDispatch();

  dispatch(actions.increment());
  const myVar = useSelector((state: any) => state.counter);
  console.log(myVar);
  return (
    <React.Fragment>
      <h1> hi from counter</h1>
      {/* <p>{myVar}</p> */}

    </React.Fragment>
  )



};
export default ReduxStuff;