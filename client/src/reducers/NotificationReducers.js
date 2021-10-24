import * as Type from "../constants/ActionTypes";

const initialState = {};
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Type.NEW_NOTI:
            state = action.notification;
            return { ...state };
        default:
            return { ...state };
    }
}
export default notificationReducer;