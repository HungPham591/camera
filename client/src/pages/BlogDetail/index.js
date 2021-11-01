import React from 'react';
import "./css/index.scss";
import { getBlog } from '../../graphql/blog';
import { useQuery } from '@apollo/client';
import HtmlParser, { attributesToProps } from 'html-react-parser';
import moment from 'moment';

export default function BlogDetail(props) {
    const { loading, error, data } = useQuery(getBlog, { variables: { _id: props?.location?.state?._id } });
    return (
        <div id='BlogDetail'>
            <div>
                <h1 className='title'>{data?.blog?.blog_title || ''}</h1>
                <p>{moment(data?.blog?.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
                {
                    HtmlParser(data?.blog?.blog_content || '')
                }
            </div>
        </div>
    )
}