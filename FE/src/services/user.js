import apiCaller from "../api/apiCaller";

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