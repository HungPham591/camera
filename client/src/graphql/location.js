import { gql } from '@apollo/client';

export const getLocations = gql`
    query{
        locations{
            _id
            location_name
            location_coordinate
        }
    }
`
export const getLocation = gql`
    query($_id:ID){
        location(_id:$_id){
            _id
            user
            location_name
            location_coordinate
            cameras{
                _id
                location
                camera_name
                camera_drive
                camera_link
                camera_location
                camera_public
                createdAt
            }
        }
    }
`

export const createLocation = gql`
    mutation($location_name:String,$location_coordinate:[Float]){
        createLocation(location_name:$location_name,location_coordinate:$location_coordinate){
            _id
            location_name
            location_coordinate
        }
    }
`

export const deleteLocation = gql`
    mutation($_id:ID){
        deleteLocation(_id:$_id){
            _id
            location_name
            location_coordinate
        }
    }
`
