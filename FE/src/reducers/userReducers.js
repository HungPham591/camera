import * as Type from "../constants/ActionTypes";

var initialState = {
    isSignIn: false
};

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case Type.LOGIN_SUCCESS:
            state = action.user;
            state.isSignIn = true;
            return { ...state };
        case Type.LOGIN_FAIL:
            return { ...state };
        case Type.LOGOUT:
            state.isSignIn = false
            return { ...state };
        default:
            return { ...state };
    }
};

export default userReducers;
