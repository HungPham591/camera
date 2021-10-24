import thunk from "redux-thunk";
import reducer from "../reducers/indexReducers";
import { compose, createStore, applyMiddleware } from "redux";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);

export default store;
