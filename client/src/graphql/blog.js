import { gql } from '@apollo/client';

export const getBlog = gql`
    query($_id:ID){
        blog(_id:$_id){
            _id
            blog_title
            blog_content
            updatedAt
        }
    }
`
export const getBlogs = gql`
    query{
        blogs{
            _id
            blog_title
            blog_content
            updatedAt
        }
    }
`
export const createBlog = gql`
    mutation($blog_title:String,$blog_content:String){
        createBlog(blog_title:$blog_title,blog_content:$blog_content){
            _id
            blog_title
            blog_content
        }
    }
`
export const updateBlog = gql`
    mutation($_id:ID,$blog_title:String,$blog_content:String){
        updateBlog(_id:$_id,blog_title:$blog_title,blog_content:$blog_content){
            _id
            blog_title
            blog_content
        }
    }
`
export const deleteBlog = gql`
    mutation($_id:ID){
        deleteBlog(_id:$_id){
            _id
            blog_title
            blog_content
        }
    }
`