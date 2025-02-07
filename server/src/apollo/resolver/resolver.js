const { sendRPCMessage } = require('../../modules/rabbitmq.modules')
const jwt = require("jsonwebtoken");

const sendCookie = (user, res) => {
    const payload = { _id: user._id, user_role: user?.user_role }
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    //httpOnly la khong cho js lay cookie, secure la cih cho su dung trong https
    res.cookie('access_token', accessToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        // secure: true
    })
}
const resolvers = {
    Query: {
        camera: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_CAMERA'),
        cameras: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_CAMERAS'),
        user: async (parent, args, { channel, req }) => await sendRPCMessage(channel, { ...args, user: req?.user }, 'GET_USER'),
        users: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_USERS'),
        video: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_VIDEO'),
        videos: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_VIDEOS'),
        report: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_REPORT'),
        reports: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_REPORTS'),
        faces: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_FACES'),
        blog: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_BLOG'),
        blogs: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_BLOGS'),
        location: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_LOCATION'),
        locations: async (parent, args, { channel }) => await sendRPCMessage(channel, args, 'GET_LOCATIONS'),
    },
    Camera: {
        videos: async (parent, args, { channel }) => await sendRPCMessage(channel, { camera: parent._id }, 'GET_VIDEOS'),
        reports: async (parent, args, { channel }) => await sendRPCMessage(channel, { camera: parent._id }, 'GET_REPORTS'),
    },
    User: {
        cameras: async (parent, args, { channel }) => await sendRPCMessage(channel, { user: parent._id }, 'GET_CAMERAS'),
        faces: async (parent, args, { channel }) => await sendRPCMessage(channel, { user: parent._id }, 'GET_FACES'),
        locations: async (parent, args, { channel }) => await sendRPCMessage(channel, { user: parent._id }, 'GET_LOCATIONS'),
    },
    Video: {
        camera: async (parent, args, { channel }) => await sendRPCMessage(channel, { _id: parent.camera }, 'GET_CAMERA')
    },
    Report: {
        camera: async (parent, args, { channel }) => await sendRPCMessage(channel, { _id: parent.camera }, 'GET_CAMERA')
    },
    Location: {
        cameras: async (parent, args, { channel }) => await sendRPCMessage(channel, { location: parent._id }, 'GET_CAMERAS'),
    },
    Mutation: {
        createCamera: async (parent, args, { channel, req }) => await sendRPCMessage(channel, { ...args, user: req?.user }, 'CREATE_CAMERA'),
        updateCamera: async (parent, args, { channel, req }) => await sendRPCMessage(channel, { ...args, user: req?.user }, 'UPDATE_CAMERA'),
        deleteCamera: async (parent, args, { channel, req }) => {
            sendRPCMessage(channel, { ...args, user: req?.user }, 'DELETE_VIDEOS')
            sendRPCMessage(channel, { ...args, user: req?.user }, 'DELETE_REPORTS')
            return await sendRPCMessage(channel, { ...args, user: req?.user }, 'DELETE_CAMERA')
        },
        createFace: async (parent, args, { channel, req }) => await sendRPCMessage(channel, { ...args, user: req?.user }, 'CREATE_FACE'),
        deleteFace: async (parent, args, { channel, req }) => await sendRPCMessage(channel, { ...args, user: req?.user }, 'DELETE_FACE'),
        createBlog: async (parent, args, { channel, req }) => await sendRPCMessage(channel, args, 'CREATE_BLOG'),
        updateBlog: async (parent, args, { channel, req }) => await sendRPCMessage(channel, args, 'UPDATE_BLOG'),
        deleteBlog: async (parent, args, { channel, req }) => await sendRPCMessage(channel, args, 'DELETE_BLOG'),
        createLocation: async (parent, args, { channel, req }) => await sendRPCMessage(channel, { ...args, user: req?.user }, 'CREATE_LOCATION'),
        deleteLocation: async (parent, args, { channel, req }) => {
            sendRPCMessage(channel, { ...args, user: req?.user }, 'DELETE_CAMERAS')
            return await sendRPCMessage(channel, { ...args, user: req?.user }, 'DELETE_LOCATION')
        },
        createUser: async (parent, args, { channel, req }) => await sendRPCMessage(channel, args, 'CREATE_USER'),
        updateUser: async (parent, args, { channel, req }) => await sendRPCMessage(channel, args, 'UPDATE_USER'),
        deleteUser: async (parent, args, { channel, req }) => await sendRPCMessage(channel, args, 'DELETE_USER'),
        signin: async (parent, args, { channel, res }) => {
            const user = await sendRPCMessage(channel, args, 'SIGNIN')
            if (!user) return user;
            sendCookie(user, res);
            return user;
        },
        signup: async (parent, args, { channel, res }) => {
            const user = await sendRPCMessage(channel, args, 'SIGNUP')
            if (!user) return user;
            sendCookie(user, res);
            return user;
        },
        logout: async (parent, args, { channel, res }) => {
            res.clearCookie('access_token')
            return args;
        }
    }
}

module.exports = resolvers