import * as Type from "../constants/ActionTypes";
import apiCaller from "../api/apiCaller";

export const actLoginRequest = (data) => {
  return (dispatch) => {
    return apiCaller("/user/getById", "POST", data).then((res) => {
      if (res.data != "") dispatch(actLoginSuccess(res.data));
      else dispatch(actLoginFail());
    });
  };
};

export const actLoginSuccess = (user) => {
  return {
    type: Type.LOGIN_SUCCESS,
    user,
  };
};
export const actLoginFail = () => {
  return {
    type: Type.LOGIN_FAIL,
  };
};

export const actLogout = () => {
  return {
    type: Type.LOGOUT,
  };
};
