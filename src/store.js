import {
  createStore,
  compose /* , applyMiddleware*/,
  applyMiddleware
} from "redux";
import rootReducer from "./reducers/root";

const initStore = () => createStore(rootReducer);
module.exports = {
  initStore
};
