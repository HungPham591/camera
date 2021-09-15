import apiCaller from "../api/apiCaller";

export const getReport = async (BODY) => {
    let rs = await apiCaller("/report/", "POST", BODY);
    return rs?.data ? rs.data : []
}
export const getReportByVideo = async (BODY) => {
    let rs = await apiCaller('/report/getByVideo', 'POST', BODY);
    return rs?.data ? rs.data : []
}