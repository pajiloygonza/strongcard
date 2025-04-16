import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import reducer from "../reducers";

const initStore = (initialState = {}) =>
  createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
export default initStore;
