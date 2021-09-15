import { NEW_NOTI } from "../constants/ActionTypes"

export const actNewNotification = (notification) => {
    return {
        type: NEW_NOTI,
        notification
    }
}