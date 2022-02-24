import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];

const initialState = {};

const initStore = () => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
  );
};

const store = initStore();

export default store;
