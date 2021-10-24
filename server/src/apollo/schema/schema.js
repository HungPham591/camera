const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type Camera{
        _id:ID
        user:User
        camera_name:String
        camera_drive:String
        camera_link:String
        camera_location:[Float]
        camera_public:Boolean
        google_token:String
        createdAt:String
        videos:[Video]
        reports:[Report]
    }
    type User{
        _id:ID
        user_name:String
        user_pass:String
        user_role:Boolean
        google_token:String
        createdAt:String
        cameras:[Camera]
    }
    type Video{
        _id:ID
        camera:Camera
        video_time:Float
        createdAt:String
    }
    type ReportDescription{
        age:Float,
        gender:String
    }
    type Report{
        _id:ID
        camera:Camera
        report_time:Float
        report_description:[ReportDescription]
        createdAt:String
    }
    type Query{
        camera(_id:ID):Camera
        cameras(camera_name:String,createdAt:Float,page:Int):[Camera]
        user(_id:ID):User
        users(page:Int):[User]
        video(_id:ID):Video
        videos(createdAt:Float,page:Int):[Video]
        report(_id:ID):Report
        reports(createdAt:Float,page:Int):[Report]
    }
    type Mutation{
        createCamera(camera_name:String,camera_link:String,camera_location:[Float],camera_public:Boolean,google_token:String):Camera
        updateCamera(_id:ID,camera_name:String,camera_link:String,camera_location:[Float],camera_public:Boolean):Camera
        deleteCamera(_id:ID):Camera
        signin(user_name:String!,user_pass:String!):User
        signup(user_name:String,user_pass:String,google_token:String):User
        logout(_id:ID):User
    }
`

module.exports = typeDefs