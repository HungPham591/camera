import { combineReducers } from "redux";

import userReducers from './userReducers';
import cameraReducers from './cameraReducers';
import reportReducers from './reportReducers';
import videoReducers from './videoReducers';
import locationReducers from './locationReducers';

const indexReducer = combineReducers({
    user:userReducers,
    camera:cameraReducers,
    report:reportReducers,
    video:videoReducers,
    location:locationReducers
});
export default indexReducer;