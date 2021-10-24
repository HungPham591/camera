import * as Type from "../constants/ActionTypes";

var initialState = [];
const locationReducers = (state = initialState, action) => {
    switch (action.type) {
        case Type.SET_LOCATION:
            state = action.location;
            return [...state];
        case Type.GET_LOCATION:
            state = action.location;
            return [...state];
        default:
            return [...state];
    }
};
export default locationReducers;
