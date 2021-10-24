import { combineReducers } from "redux";

import userReducers from './userReducers';
import locationReducers from './locationReducers';
import notificationReducer from "./NotificationReducers";

const indexReducer = combineReducers({
    user: userReducers,
    location: locationReducers,
    notification: notificationReducer,
});
export default indexReducer;