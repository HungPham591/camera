import apiCaller from "../api/apiCaller";

export const getVideo = async (BODY) => {
    let rs = await apiCaller("/video/", "POST", BODY);
    return rs?.data ? rs.data : []
}