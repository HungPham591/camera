import { gql } from '@apollo/client';

export const getReport = gql`
    query($_id:ID){
        report(_id:$_id){
            _id
            report_time
            report_description
            createdAt
        }
    }
`
export const getReports = gql`
    query{
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
`