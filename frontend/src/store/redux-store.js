const redux = require("redux");

const changeHandlerReducerFunction = (
  state = { myVar: "initial state" },
  action
) => {
  if (action.type == "button-click-somewhere") {
    return { ...state, myVar: "updated state after button-click-somewhere" };
  }
  return state;
};

const store = redux.createStore(changeHandlerReducerFunction);
// seems to work, just had a typo.
const mySubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(mySubscriber);
store.dispatch({ type: "something else" });
store.dispatch({ type: "button-click-somewhere" });
// https://stackoverflow.com/questions/71944111/redux-createstore-is-deprecated-cannot-get-state-from-getstate-in-redux-ac
