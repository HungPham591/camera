import apiCaller from "../api/apiCaller";

export const getCamera = async (BODY) => {
    let rs = await apiCaller("/camera/", "GET", BODY);
    return rs?.data ? rs.data : []
}
export const createCamera = async (BODY) => {
    let rs = await apiCaller("/camera/", "POST", BODY);
    return rs?.data ? rs.data : null
}
export const updateCamera = async (BODY) => {
    let rs = await apiCaller("/camera/", "PUT", BODY);
    return rs?.data ? rs.data : null
}
export const deleteCamera = async (BODY) => {
    let rs = await apiCaller("/camera/", "DELETE", BODY);
    return rs?.data ? rs.data : null
}