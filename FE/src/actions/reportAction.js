import * as Type from "../constants/ActionTypes";
import apiCaller from "../api/apiCaller";

export const actGetReportRequest = () => {
  return (dispatch) => {
    return apiCaller("/report/get", "GET", null).then((res) => {
      dispatch(actGetReport(res.data));
    });
  };
};

export const actGetReport = (report) => {
  return {
    type: Type.GET_REPORT,
    report: report,
  };
};

export const actInsertReportRequest = (report) => {
  return (dispatch) => {
    return apiCaller("/report/insert", "POST", report).then((res) => {
      dispatch(actInsertReport(res.data));
    });
  };
};

export const actInsertReport = (report) => {
  return {
    type: Type.INSERT_REPORT,
    report,
  };
};

export const actGetReportByIdRequest = (report_id) => {
  return (dispatch) => {
    return apiCaller("/report/getById", "GET", report_id).then((res) => {
      dispatch(actGetReportById(res.data));
    });
  };
};

export const actGetReportById = (report) => {
  return {
    type: Type.GET_REPORT_BYID,
    report,
  };
};

export const actGetReportByCameraRequest = (camera) => {
  return (dispatch) => {
    return apiCaller("/report/getByCamera", "GET", camera).then((res) => {
      dispatch();
    });
  };
};

export const actGetReportByCamera = (report) => {
  return {
    type: Type.GET_REPORT_BYCAMERA,
    report,
  };
};
