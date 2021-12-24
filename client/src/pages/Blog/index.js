import React from 'react';
import "./css/index.scss";
import { getBlogs } from '../../graphql/blog';
import { useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import HtmlParser, { attributesToProps } from 'html-react-parser';
import slug from 'vietnamese-slug';

export default function Blog(props) {
    const history = useHistory();

    const { loading, error, data } = useQuery(getBlogs);
    const tags = ['CAMERA', 'RECORDING', 'ENVIRONMENT', 'API', 'MOBILE'];
    const HtmlParserOptions = {
        // replace: domNode => {
        //     if (domNode.attribs && domNode.name !== 'p') {
        //         const props = attributesToProps(domNode.attribs);
        //         return <span>{domNode.children[0].data}</span>;
        //     }
        // }
    };

    const handleWatchMoreButton = (item) => {
        history.push({
            pathname: '/BlogDetail',
            search: slug(item.blog_title),
            state: item
        })
    }
    return (
        <div id='Blog'>
            <div className='left-pane'>
                <div className='menu'>
                    <p className='title'>Tìm kiếm</p>
                    <input placeholder='Nhập từ khóa tìm kiếm...' />
                </div>
                <div className='menu'>
                    <p className='title'>Chủ đề</p>
                    <ul>
                        {
                            tags.map((value, index) => {
                                return (
                                    <li className='item' key={index}>{value}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='right-pane'>
                <p className='title'>Hướng dẫn</p>
                {
                    data?.blogs?.map((value, index) => {
                        return (
                            <div key={index} className='custom-card'>
                                <p className='title'>{value?.blog_title}</p>
                                <p className='content'>{HtmlParser(value?.blog_content, HtmlParserOptions)}<div className='gradient'></div></p>
                                <button onClick={() => handleWatchMoreButton(value)}>Xem thêm</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}