import apiCaller from "../api/apiCaller";

exports.getReport = async (BODY) => {
    let rs = await apiCaller("/report/", "GET", BODY);
    rs?.data ? rs.data : []
}