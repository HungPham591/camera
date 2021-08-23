import * as Type from "../constants/ActionTypes";

var initialState = [];
const cameraReducers = (state = initialState, action) => {
  const { camera } = action;
  switch (action.type) {
    case Type.GET_CAMERA:
      state = camera;
      return [...state];
    case Type.GET_CAMERA_BYID:
      state.push(camera);
      return [...state];
    case Type.INSERT_CAMERA:
      state.push(camera);
      return [...state];
    case Type.UPDATE_CAMERA:
      state.forEach((value, index) => {
        if (value.camera_id === camera.camera_id)
          state[index] = camera;
      });
    case Type.DELETE_CAMERA:
      state = state.filter((data) => data.camera_id != camera.camera_id);
      console.log(state)
      return [...state];
    default:
      return [...state];
  }
};
export default cameraReducers;
