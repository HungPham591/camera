import { gql } from '@apollo/client';

export const getVideo = gql`
    query($_id:ID){
        video(_id:$_id){
            _id
            video_time
            createdAt
            camera{
                _id
                camera_name
                reports{
                    _id
                    report_time
                    createdAt
                }
            }
        }
    }
`
export const getVideos = gql`
    query{
        videos{
            _id
            video_time
            createdAt
            camera{
                _id
            }
        }
    }
`