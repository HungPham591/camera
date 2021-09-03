import apiCaller from "../api/apiCaller";

exports.getVideo = async (BODY) => {
    let rs = await apiCaller("/video/", "GET", BODY);
    rs?.data ? rs.data : []
}