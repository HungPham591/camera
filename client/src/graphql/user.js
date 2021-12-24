import { gql } from '@apollo/client';


export const getUsers = gql`
    query{
        users{
            _id
            user_name
            user_pass
            user_role
            google_token
            createdAt
        }
    }
`
export const getUser = gql`
    query($_id:ID){
        user(_id:$_id){
            _id
            user_name
            user_pass
            user_role
            google_token
            createdAt
            faces{
                _id
                face_name
            }
            locations {
                _id
                location_name
                location_coordinate
            }
            cameras{
                _id
                location
                user
                camera_name
                camera_drive
                camera_link
                camera_location
                camera_public
                createdAt
                reports{
                    _id
                    report_time
                    report_description{
                        age
                        gender
                    }
                    createdAt
                }
                videos{
                    _id
                    video_time
                    createdAt
                    camera{
                        _id
                    }
                }
            }
        }
    }
`
export const createUser = gql`
    mutation($user_name:String!,$user_pass:String!,$user_role:Boolean){
        createUser(user_name:$user_name,user_pass:$user_pass,user_role:$user_role){
            _id
            user_name
            user_pass
            user_role
            createdAt
        }
    }
`
export const updateUser = gql`
    mutation($_id:ID,$user_name:String,$user_pass:String,$user_role:Boolean){
        updateUser(_id:$_id,user_name:$user_name,user_pass:$user_pass,user_role:$user_role){
            _id
            user_name
            user_pass
            user_role
            google_token
            createdAt
        }
    }
`
export const deleteUser = gql`
    mutation($_id:ID){
        deleteUser(_id:$_id){
            _id
            user_name
            user_pass
            user_role
            google_token
            createdAt
        }
    }
`
export const signin = gql`
    mutation($user_name:String!,$user_pass:String!){
        signin(user_name:$user_name,user_pass:$user_pass){
            _id
            user_name
            user_pass
            user_role
            google_token
            createdAt
        }
    }
`
export const signup = gql`
    mutation($user_name:String,$user_pass:String,$google_token:String){
        signup(user_name:$user_name,user_pass:$user_pass,google_token:$google_token){
            _id
            user_name
            user_pass
            user_role
            google_token
            createdAt
        }
    }
`

export const logout = gql`
    mutation($_id:ID){
        logout(_id:$_id){
            _id
        }
    }
`