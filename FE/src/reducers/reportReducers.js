import * as Type from "../constants/ActionTypes";

var initialState = [];
const reportReducers = (state = initialState, action) => {
  switch (action.type) {
    case Type.GET_REPORT:
      state = action.report;
      return [...state];
    case Type.INSERT_REPORT:
      state.push(action.report);
      return [...state];
    default:
      return [...state];
  }
};
export default reportReducers;
