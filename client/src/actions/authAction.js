import * as Type from "../constants/ActionTypes";

export const actSigninSuccess = (user) => {
    return {
        type: Type.LOGIN_SUCCESS,
        user,
    };
};
export const actSigninFail = () => {
    return {
        type: Type.LOGIN_FAIL,
    };
};
export const actSignUp = () => {

}

export const actLogout = () => {
    return {
        type: Type.LOGOUT,
    };
};
