import apiCaller from "../api/apiCaller";

export const getReport = async (BODY) => {
    let rs = await apiCaller("/report/", "POST", BODY);
    return rs?.data ? rs.data : []
}