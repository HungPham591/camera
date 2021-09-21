import apiCaller from "../api/apiCaller";

export const getAllUser = async () => {
    let rs = await apiCaller('/user/getAll', 'GET', null);
    return rs?.data ? rs.data : []
}
export const getUserInfo = async (BODY) => {
    let rs = await apiCaller('/user/getInfo/', "GET", BODY);
    return rs?.data;
}
export const signIn = async (BODY) => {
    let rs = await apiCaller('/user/signIn/', "POST", BODY);
    return rs;
}
export const signUp = async (BODY) => {
    let rs = await apiCaller('/user/signUp/', "POST", BODY);
    return rs;
}
export const logOut = async (BODY) => {

}