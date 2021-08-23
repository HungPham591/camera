import * as Type from "../constants/ActionTypes";

var initialState = [];
const videoReducers = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_VIDEO:
      state = action.video;
      return [...state];
    case Type.INSERT_VIDEO:
      state.push(action.video);
      return [...state];
    default:
      return [...state];
  }
};
export default videoReducers;
