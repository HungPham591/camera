import React, { useState, useEffect } from "react";
import "./css/style.scss";

import aiServiceSvg from './css/ai-services.svg';
import cloudServiceSvg from './css/cloud-services.svg';
import recordAccessSvg from './css/record-access.svg';
import triggerAccessSvg from './css/trigger-notification.svg';
import ideaSvg from './css/we-have-an-idea.svg';

export default function Home(props) {
    return (
        <div id="Home">
            <div id='panel' className='panel'>
                <div className='content'>
                    <p className='title'>
                        Nền tảng và ứng dụng điện toán đám mây cho camera.
                    </p>
                    <div style={{ marginBottom: '40px' }}>
                        <p className='sub-title'>
                            Giúp quản lý hệ thống camera tập trung bằng công nghệ điện toán đám mây.
                        </p>
                        <p className='sub-title'>
                            Giải pháp lưu trữ và xử lý thông tin tối ưu cho bạn.
                        </p>
                        <p className='sub-title'>
                            Tương thích với các thiết bị theo chuẩn Onvif.
                        </p>
                    </div>
                    <button>
                        DÙNG THỬ NGAY
                    </button>
                </div>
                <img src={triggerAccessSvg} />
            </div>
            <div className='section-1'>
                <div >
                    <p className='text-center title1'>Xin chào! Chúng tôi là LadiPage</p>
                    <p className='text-center title2'>#1 Nền tảng Landing Page giúp tối đa hóa<br /> chuyển đổi cho quảng cáo</p>
                    <p className='text-center desciption'>Thu về nhiều khách hàng hơn với hệ thống tính năng dành riêng cho tối<br /> ưu chuyển đổi và nền tảng thiết kế kéo thả đơn giản, mạnh mẽ.</p>
                </div>
                <div className='card-container'>
                    <div className='card'>
                        <div className='head'>
                            <p className='title'>$49</p>
                            <p className='sub-title'>Standard License</p>
                        </div>
                        <div className='body'>
                            <p>No limit camera</p>
                            <p>6 months technical support</p>
                            <p>No limit memory</p>
                            <p>Use for personal or a client</p>
                        </div>
                        <button>Purchase now</button>
                    </div>
                    <div className='card'>
                        <div className='head'>
                            <p className='title'>$99</p>
                            <p className='sub-title'>Standard License</p>
                        </div>
                        <div className='body'>
                            <p>No limit camera</p>
                            <p>6 months technical support</p>
                            <p>No limit memory</p>
                            <p>Use for personal or a client</p>
                        </div>
                        <button>Purchase now</button>
                    </div>
                    <div className='card'>
                        <div className='head'>
                            <p className='title'>$299</p>
                            <p className='sub-title'>Standard License</p>
                        </div>
                        <div className='body'>
                            <p>No limit camera</p>
                            <p>6 months technical support</p>
                            <p>No limit memory</p>
                            <p>Use for personal or a client</p>
                        </div>
                        <button>Purchase now</button>
                    </div>
                </div>
            </div>
            <div className='section-2'>
                <img src={cloudServiceSvg} />
                <div className='content'>
                    <p className='text-small'>why us?</p>
                    <p className='title'>Be a Better Business in Every Way That Matters</p>
                    <p>vCloudcam là một sản phẩm của VNG Cloud, cung cấp dịch vụ giám sát và lưu trữ trực tuyến dữ liệu từ camera trên nền tảng công nghệ điện toán đám mây, hỗ trợ sử dụng dịch vụ đa nền tảng (Web, Mobile App, Desktop).vCloudcam cung cấp những dịch vụ phù hợp cho mọi đối tượng khách hàng như trường học, ngân hàng, nhà máy, chuỗi cửa hàng,…

                        Với mục đích đem lại những giải pháp lưu trữ và xử lý thông tin từ camera một cách hiệu quả, vCloudcam mong muốn cùng đồng hành cùng bạn.</p>
                </div>
            </div>
            <div className='section-3'>
                <p className='text-small'>Lợi ích</p>
                <p className='title'>Giờ đây, việc vận hành hệ thống camera dễ dàng hơn, hiệu quả hơn</p>
                <div className='grid'>
                    <div className='cell'>
                        <div>
                            <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                            <p>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div>
                            <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                            <p>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div>
                            <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                            <p>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div>
                            <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                            <p>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div>
                            <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                            <p>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                        </div>
                    </div>
                    <div className='cell'>
                        <div>
                            <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                            <p>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section-4'>

            </div>
            <div className='section-5'>

            </div>
            <div className='section-6'>
                <div className='content'></div>
                <img src={ideaSvg} />
            </div>
        </div>
    );
}
