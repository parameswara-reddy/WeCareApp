import { combineReducers } from "redux";
import userReducer from "./users";
import questions from "./questions.reducer";
import survey from "./survey.reducer";
export default combineReducers({ users: userReducer, questions, survey });
