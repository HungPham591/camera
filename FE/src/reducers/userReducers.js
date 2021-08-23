import * as Type from "../constants/ActionTypes";

var initialState = {
  _id: -1,
  user_gmail: "",
  user_pass: "",
  user_share: [],
  user_save: [],
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case Type.LOGIN_SUCCESS:
      state = action.user;
      return { ...state };
    case Type.LOGIN_FAIL:
      return { ...state };
    case Type.LOGOUT:
      return {
        ...state,
        _id: -1,
        user_name: "",
        user_pass: "",
        user_share: [],
        user_save: [],
      };
    default:
      return { ...state };
  }
};

export default userReducers;
