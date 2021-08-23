import * as Type from "../constants/ActionTypes";
import apiCaller from "../api/apiCaller";

export const actGetVideoRequest = () => {
  return (dispatch) => {
    return apiCaller("/video/get", "GET", null).then((res) => {
      dispatch(actGetVideo(res.data));
    });
  };
};

export const actGetVideo = (video) => {
  return {
    type: Type.GET_VIDEO,
    video: video,
  };
};

export const actInsertVideoRequest = (video) => {
  return (dispatch) => {
    return apiCaller("/video/insert", "POST", video).then((res) => {
      dispatch(actInsertVideo(res.data));
    });
  };
};

export const actInsertVideo = (video) => {
  return {
    type: Type.INSERT_VIDEO,
    video,
  };
};

export const actGetVideoByIdRequest = (video_id) => {
  return (dispatch) => {
    return apiCaller("/video/getById", "GET", video_id).then((res) => {
      dispatch(actGetVideoById(res.data));
    });
  };
};

export const actGetVideoById = (video) => {
  return {
    type: Type.GET_VIDEO_BYID,
    video,
  };
};

export const actGetVideoByCameraRequest = (camera) => {
  return (dispatch) => {
    return apiCaller("/video/getByCamera", "GET", camera).then((res) => {
      dispatch();
    });
  };
};

export const actGetVideoByCamera = (video) => {
  return {
    type: Type.GET_VIDEO_BYCAMERA,
    video,
  };
};
