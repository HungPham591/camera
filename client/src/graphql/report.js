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
    query($start:Float,$end:Float,$camera:String){
        reports(start:$start,end:$end,camera:$camera){
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