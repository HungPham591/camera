import { gql } from '@apollo/client';

export const getCameras = gql`
    query($camera_name:String){
        cameras(camera_name:$camera_name){
            _id
            user
            camera_name
            camera_link
            camera_location
            createdAt
        }
    }
`
export const getCamera = gql`
    query($_id:ID){
        camera(_id:$_id){
            _id
            user
            working_time
            detect_zone{
                x
                y
            }
            camera_name
            camera_drive
            camera_link
            camera_location
            createdAt
            videos{
                _id
                video_time
                createdAt
            }
            reports{
                _id
                report_time
                report_description{
                    age
                    gender
                }
                createdAt
            }
        }
    }
`
export const createCamera = gql`
    mutation($camera_name:String,$camera_location:[Float],$camera_link:String,$camera_public:Boolean,$google_token:String,$location:String){
        createCamera(camera_name:$camera_name,camera_location:$camera_location,camera_link:$camera_link,camera_public:$camera_public,google_token:$google_token,location:$location){
            _id
            camera_name
            camera_link
            camera_location
        }
    }
`
export const updateCamera = gql`
    mutation($_id:ID,$camera_name:String,$camera_location:[Float],$camera_link:String,$camera_public:Boolean,$working_time:[String],$detect_zone:[PointInput]){
        updateCamera(_id:$_id,camera_name:$camera_name,camera_location:$camera_location,camera_link:$camera_link,camera_public:$camera_public,working_time:$working_time,detect_zone:$detect_zone){
            _id
            camera_name
            camera_link
            camera_location
        }
    }
`
export const deleteCamera = gql`
    mutation($_id:ID){
        deleteCamera(_id:$_id){
            _id
            camera_name
            camera_link
            camera_location
        }
    }
`