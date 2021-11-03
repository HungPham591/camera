import React, { useState, useEffect } from "react";
import "./css/style.scss";
import { BsPhone } from 'react-icons/bs'
import { AiOutlineLink } from 'react-icons/ai'
import { IoMdFolderOpen } from 'react-icons/io'
import { CgCheck } from 'react-icons/cg'

import aiServiceSvg from './css/ai-services.svg';
import cloudServiceSvg from './css/cloud-services.svg';
import recordAccessSvg from './css/record-access.svg';
import triggerAccessSvg from './css/trigger-notification.svg';
import ideaSvg from './css/we-have-an-idea.svg';
import aws from './css/aws.png';
import digitalocean from './css/digital-ocean.png';
import googlecloud from './css/google-cloud.png';

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
                <img src={recordAccessSvg} />
                <div className='content'>
                    <p className='text-small'>why us?</p>
                    <p className='title'>Be a Better Business in Every Way That Matters</p>
                    <p>vCloudcam là một sản phẩm của VNG Cloud, cung cấp dịch vụ giám sát và lưu trữ trực tuyến dữ liệu từ camera trên nền tảng công nghệ điện toán đám mây, hỗ trợ sử dụng dịch vụ đa nền tảng (Web, Mobile App, Desktop).vCloudcam cung cấp những dịch vụ phù hợp cho mọi đối tượng khách hàng như trường học, ngân hàng, nhà máy, chuỗi cửa hàng,…</p>
                    <p className='title' style={{ fontSize: '1.25rem', marginTop: '6vh' }}>Why Our Customers Love Us?</p>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>No outsourcing. Only In-House Geniuses at Work.</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Proven Expertise in Cutting-edge technology</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Incredible Prices</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Complete lifecycle management</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>We Create Digital Experiences Tailored to Your Target Segment</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>We love challenges. Bring it on</p></div>
                </div>
            </div>
            <div className='section-3'>
                <p className='text-small'>Lợi ích</p>
                <p className='title'>Giờ đây, việc vận hành hệ thống camera dễ dàng hơn, hiệu quả hơn</p>
                <div className='grid'>
                    <div className='cell'>
                        <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                        <p className='content'>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                        <p className='content'>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                        <p className='content'>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                        <p className='content'>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                        <p className='content'>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Truy cập mọi lúc, mọi nơi</p>
                        <p className='content'>Quản lý camera từ nhiều vị trí trên cùng 1 tài khoản. Lưu trữ và truy cập không giới hạn, giám sát mọi lúc, mọi nơi với ứng dụng đa nền tảng. Phương thức phân quyền đáp ứng cho nhiều cách vận hành.</p>
                    </div>
                </div>
            </div>
            <div className='section-4'>
                <p className='text-small'>Làm thế nào để bắt đầu?</p>
                <p className='title'>Kết nối và quản lý tập trung camera với các bước đơn giản.</p>
                <div className='grid'>
                    <div className='cell'>
                        <div className='icon'>
                            <BsPhone />
                        </div>
                        <p className='title'>Đăng ký tài khoản</p>
                        <p className='content'>Đăng ký tài khoản trên trang web để bắt đầu trải nghiệm.</p>
                    </div>
                    <div className='cell'>
                        <div className='icon'>
                            <AiOutlineLink />
                        </div>
                        <p className='title'>Kết nối thiết bị</p>
                        <p className='content'>Thêm box và những camera những camera cùng lớp mạng với vBox đó.</p>
                    </div>
                    <div className='cell'>
                        <div className='icon'>
                            <IoMdFolderOpen />
                        </div>
                        <p className='title'>Quản lý và giám sát</p>
                        <p className='content'>Giám sát mọi lúc mọi nơi. Xem lại dữ liệu lưu trữ dễ dàng.</p>
                    </div>
                </div>
            </div>
            <div className='section-5'>
                <p className='title'>Gặp gỡ các đối tác dịch vụ đám mây của chúng tôi</p>
                <p className='small-title'>Đã làm việc trên nhiều môi trường đám mây, các chuyên gia của chúng tôi đã tin tưởng vào hiệu suất, độ tin cậy và hiệu quả của các nền tảng đám mây sau</p>
                <div className='grid'>
                    <div className='cell'>
                        <img src={aws} />
                    </div>
                    <div className='cell'>
                        <img src={digitalocean} />
                    </div>
                    <div className='cell'>
                        <img src={googlecloud} />
                    </div>
                </div>
            </div>
            <div className='section-6'>
                <div className='content'>
                    <p className='title'>Want to become afast-innovating business?</p>
                    <p>Transform your organization into a cloud-first business and become leaner, faster, and more agile than ever.</p>
                    <div className='button-group'>
                        <button className='button1'>Get Estimate</button>
                        <button className='button2'>Contact Us</button>
                    </div>
                </div>
                <img src={ideaSvg} />
            </div>
        </div>
    );
}
