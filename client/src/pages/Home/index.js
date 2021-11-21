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
                    <p className='text-center title1'>Xin chào! Chúng tôi là Camera</p>
                    <p className='text-center title2'>#1 Nền tảng điện toán đám mây dành cho camera<br /> quản lý camera một cách thông minh</p>
                    <p className='text-center desciption'>Quản lý camera dễ dàng hơn vơi hệ thống điện toán đám mây<br />giám sát và theo dõi đễ dàng.</p>
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
                    <p className='title'>Quản lý camera chưa bao giờ dễ dàng đến thế</p>
                    <p>Camera là một sản phẩm của chúng tôi, cung cấp dịch vụ giám sát và lưu trữ trực tuyến dữ liệu từ camera trên nền tảng công nghệ điện toán đám mây, hỗ trợ sử dụng dịch vụ đa nền tảng (Web, Mobile App, Desktop).Camera cung cấp những dịch vụ phù hợp cho mọi đối tượng khách hàng như trường học, ngân hàng, nhà máy, chuỗi cửa hàng,…</p>
                    <p className='title' style={{ fontSize: '1.25rem', marginTop: '6vh' }}>Why Our Customers Love Us?</p>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Giá thành hợp lý phù hợp mọi khách hàng.</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Hỗ trợ khách hàng một cách chu đáo và tận tình.</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Khách hàng là trên hết.</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Đội ngũ nhân viên chuyên nghiệp.</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>Sử dụng những công nghệ mới nhất</p></div>
                    <div style={{ display: 'flex' }}><CgCheck className='icon' /><p>We love challenges. Bring it on.</p></div>
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
                        <p className='title'>Hệ thống thông báo đa kênh, đúng người, đúng thời điểm</p>
                        <p className='content'>Người dùng dễ dàng tạo & quản lý thông báo cho từng sự kiện. Nhận thông báo qua các kênh email, tin nhắn Zalo, thiết bị ngoại vi (loa, còi). Giúp người dùng có thể phản ứng kịp thời với hệ thống giám sát.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>An toàn và bảo mật dữ liệu</p>
                        <p className='content'>Toàn bộ dữ liệu được lưu trên hệ thống TTDL đạt chuẩn quốc tế, đảm bảo an toàn, bảo mật. Dữ liệu được mã hóa trước khi truyền đi. Xác thực đa yếu tố.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Các tính năng AI từ Cloud - Giúp camera của bạn trở nên thông minh hơn</p>
                        <p className='content'>Tích hợp các tính năng phát hiện chuyển động, vượt rào ảo, xâm nhập vùng cấm, đếm lượt người, nhận diện biển số và nhiều hơn thế.</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Tiết kiệm chi phí thiết lập, lưu trữ và bảo trì hệ thống.</p>
                        <p className='content'>Không cần đầu tư hệ thống từ đầu. Không cần đường truyền nội bộ phức tạp. Tiết kiệm chi phí vận hành phần cứng, đường truyền, nguồn điện,...</p>
                    </div>
                    <div className='cell'>
                        <p className='title'>Linh hoạt thay đổi, mở rộng dịch vụ.</p>
                        <p className='content'>Tùy chọn gói dịch vụ cho từng camera. Mua thêm dịch vụ nhanh chóng khi mở rộng số lượng thiết bị. Thay đổi dịch vụ dễ dàng.</p>
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
                    <p className='title'>Bạn có muốn nhận sự hỗ trợ từ chúng tôi?</p>
                    <p>Bạn sẽ nhận được sự hỗ trợ nhiệt tình, bất cứ câu hỏi nào bạn đặt ra đều được chúng tôi trả lời một cách chi tiết.</p>
                    <div className='button-group'>
                        <button className='button1'>Gửi tin nhắn</button>
                        <button className='button2'>Gọi điện</button>
                    </div>
                </div>
                <img src={ideaSvg} />
            </div>
        </div>
    );
}
