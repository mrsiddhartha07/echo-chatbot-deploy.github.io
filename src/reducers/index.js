import { combineReducers } from 'redux';
import handleChat from "./handleChatReducers";
import addUser from "./addUserReducer";

export default combineReducers({addUser, handleChat});