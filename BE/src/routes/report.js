const express = require("express");
const router = express.Router();
const ReportModel = require("../models/ReportModel");
const CameraModel = require("../models/CameraModel");
const CameraJS = require("../CameraJS");

router.get("/", async (req, res, next) => {
    let query = req.body;
    let listReport = await ReportModel.find(query);
    res.send(listReport);
});

router.post("/", async function (req, res, next) {

});
router.put("/", async (req, res, next) => {
});
router.delete("/", async (req, res, next) => {
});

module.exports = router;
