const userRouter = require("./user");
const cameraRouter = require("./camera");
const videoRouter = require("./video");
const reportRouter = require("./report");


const route = (app, listCamera) => {
  app.use("/user", userRouter);
  app.use("/video", videoRouter);
  app.use("/report", reportRouter);
  cameraRouter(app, listCamera);
};

module.exports = route;
