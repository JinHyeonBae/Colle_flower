import { combineReducers } from "redux";
import userReducer from "./userReducer";

const combinedReducer = combineReducers({
  userReducer,
});

export default combinedReducer;
