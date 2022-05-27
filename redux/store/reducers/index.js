import { combineReducers } from "redux";
import userReducer from "./user.reducer";

const Reducer = combineReducers({
  user: userReducer,
});

export default Reducer;
