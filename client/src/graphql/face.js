import { gql } from '@apollo/client';

export const getFaces = gql`
    query{
        faces{
            _id
            face_name
        }
    }
`

export const createFace = gql`
    mutation($face_name:String){
        createFace(face_name:$face_name){
            _id
            face_name
        }
    }
`

export const deleteFace = gql`
    mutation($_id:ID){
        deleteFace(_id:$_id){
            _id
            face_name
        }
    }
`
