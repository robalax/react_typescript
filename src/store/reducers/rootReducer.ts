import { combineReducers } from "redux";

import {favoriteReducer} from "./favorite";

const reducers = {
  favorite: favoriteReducer,
};

export default combineReducers(reducers);
