import * as Type from "../constants/ActionTypes";
import apiCaller from "../api/apiCaller";

export const actGetCameraRequest = () => {
  return (dispatch) => {
    return apiCaller("/camera/get", "GET", null).then((res) => {
      dispatch(actGetCamera(res.data));
    });
  };
};

export const actGetCamera = (camera) => {
  return {
    type: Type.GET_CAMERA,
    camera: camera,
  };
};

export const actInsertCameraRequest = (camera) => {
  return (dispatch) => {
    return apiCaller("/camera/insert", "POST", camera).then((res) => {
      dispatch(actInsertCamera(res.data));
    });
  };
};

export const actInsertCamera = (camera) => {
  return {
    type: Type.INSERT_CAMERA,
    camera,
  };
};

export const actGetCameraByIdRequest = (camera_id) => {
  return (dispatch) => {
    return apiCaller("/camera/getById", "GET", camera_id).then((res) => {
      dispatch(actGetCameraById(res.data));
    });
  };
};

export const actGetCameraById = (camera) => {
  return {
    type: Type.GET_CAMERA_BYID,
    camera,
  };
};

export const actUpdateCameraRequest = (camera) => {
  return (dispatch) => {
    return apiCaller("/camera/update", "PUT", camera).then((res) => {
      dispatch(actUpdateCamera(res.data));
    });
  };
};

export const actUpdateCamera = (camera) => {
  return {
    type: Type.UPDATE_CAMERA,
    camera,
  };
};

export const actDeleteCameraRequest = (camera) => {
  return (dispatch) => {
    return apiCaller("/camera/delete", "DELETE", camera).then((res) => {
      dispatch(actDeleteCamera(res.data));
    });
  };
};

export const actDeleteCamera = (camera) => {
  return {
    type: Type.DELETE_CAMERA,
    camera,
  };
};
