import * as Type from "../constants/ActionTypes";

var initialState = {
};

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case Type.LOGIN_SUCCESS:
            state = action.user;
            return { ...state };
        case Type.LOGIN_FAIL:
            return { ...state };
        case Type.LOGOUT:
            state = {};
            return { ...state };
        default:
            return { ...state };
    }
};

export default userReducers;
