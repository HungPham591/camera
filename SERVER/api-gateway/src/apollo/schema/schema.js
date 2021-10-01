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
        createdAt:String
        videos:[Video]
        reports:[Report]
    }
    type User{
        _id:ID
        user_gmail:String
        user_pass:String
        google_id:String
        google_token:String
        access_token:String
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
        cameras(camera_name:String,createdAt:Float):[Camera]
        user(_id:ID):User
        users:[User]
        video(_id:ID):Video
        videos(createdAt:Float):[Video]
        report(_id:ID):Report
        reports(createdAt:Float):[Report]
    }
    type Mutation{
        createCamera(camera_name:String,camera_link:String,camera_location:[Float],camera_public:Boolean):Camera
        updateCamera(_id:ID,camera_name:String,camera_link:String,camera_location:[Float],camera_public:Boolean):Camera
        deleteCamera(_id:ID):Camera
        signin(user_gmail:String!,user_pass:String!):User
        signup(user_gmail:String,user_pass:String,google_id:String,google_token:String,access_token:String):User
    }
`

module.exports = typeDefs