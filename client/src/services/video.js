import apiCaller from "../api/apiCaller";

export const getAllVideo = async () => {
    let rs = await apiCaller('/video/getAll', 'GET', null);
    return rs?.data ? rs.data : []
}
export const getVideo = async (BODY) => {
    let rs = await apiCaller("/video/", "POST", BODY);
    return rs?.data ? rs.data : []
}