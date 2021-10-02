import * as Type from "../constants/ActionTypes";

export const actSetLocation = (location) => {
    return {
        type: Type.SET_LOCATION,
        location: location,
    };
};

export const actGetLocationRequest = () => {
    return (dispatch) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    dispatch(actGetLocation([location.coords.latitude, location.coords.longitude]));
                },
                (err) => {
                    console.log('err khong lay duoc vi tri')
                }
            );
        } else {
            console.log('err khong co vi tri')
        }
    };
};

export const actGetLocation = (location) => {
    return {
        type: Type.GET_LOCATION,
        location: location,
    };
};
