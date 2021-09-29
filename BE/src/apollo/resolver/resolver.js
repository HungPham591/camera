const resolvers = {
    Query: {
        camera: async (parent, args, { controller, req, res }) => await controller.CameraController.getCamera(args, req, res),
        cameras: async (parent, args, { controller, req, res }) => await controller.CameraController.getCameras(args, req, res),
        user: async (parent, args, { controller, req, res }) => await controller.UserController.getUser(args, req, res),
        users: async (parent, args, { controller, req, res }) => await controller.UserController.getUsers(args, req, res),
        video: async (parent, args, { controller, req, res }) => await controller.VideoController.getVideo(args, req, res),
        videos: async (parent, args, { controller, req, res }) => await controller.VideoController.getVideos(args, req, res),
        report: async (parent, args, { controller, req, res }) => await controller.ReportController.getReport(args, req, res),
        reports: async (parent, args, { controller, req, res }) => await controller.ReportController.getReports(args, req, res),
    },
    Camera: {
        videos: async (parent, args, { controller, req, res }) => await controller.VideoController.getVideos({ camera: parent._id }, req, res),
        reports: async (parent, args, { controller, req, res }) => await controller.ReportController.getReports({ camera: parent._id }, req, res),
    },
    User: {
        cameras: async (parent, args, { controller, req, res }) => await controller.CameraController.getCameras({ user: parent._id }, req, res)
    },
    Video: {
        camera: async (parent, args, { controller, req, res }) => await controller.CameraController.getCamera({ _id: parent.camera }, req, res)
    },
    Report: {
        camera: async (parent, args, { controller, req, res }) => await controller.CameraController.getCamera({ _id: parent.camera }, req, res)
    },
    Mutation: {
        createCamera: async (parent, args, { controller, req, res }) => await controller.CameraController.createCamera(args, req, res),
        updateCamera: async (parent, args, { controller, req, res }) => await controller.CameraController.updateCamera(args, req, res),
        deleteCamera: async (parent, args, { controller, req, res }) => await controller.CameraController.deleteCamera(args, req, res),
        signin: async (parent, args, { controller, req, res }) => await controller.UserController.signIn(args, req, res),
        signup: async (parent, args, { controller, req, res }) => await controller.UserController.signUp(args, req, res),
    }
}

module.exports = resolvers