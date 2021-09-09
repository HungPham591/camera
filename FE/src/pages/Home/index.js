import React, { useState, useEffect } from "react";
import "./css/style.scss";
import Aos from 'aos'
import 'aos/dist/aos.css'
import supportIcon from './css/support.svg'
import vaultIcon from './css/vault.svg'
import mobileIcon from './css/mobile.svg'

export default function Home(props) {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div id="Home">
            <div id='panel' className='panel'>
                <div>
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
                    <button className='button'>
                        DÙNG THỬ NGAY
                    </button>
                </div>
            </div>
            <div className='content'>
                <div data-aos="fade" data-aos-once={true}>
                    <p className='text-center title1'>Xin chào! Chúng tôi là LadiPage</p>
                    <p className='text-center title2'>#1 Nền tảng Landing Page giúp tối đa hóa<br /> chuyển đổi cho quảng cáo</p>
                    <p className='text-center desciption'>Thu về nhiều khách hàng hơn với hệ thống tính năng dành riêng cho tối<br /> ưu chuyển đổi và nền tảng thiết kế kéo thả đơn giản, mạnh mẽ.</p>
                </div>
                <div className='card-container'>
                    <div className='card' data-aos="fade-up" data-aos-delay={500} data-aos-once={true}>
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
                    <div className='card' data-aos="fade-up" data-aos-delay={300} data-aos-once={true}>
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
                    <div className='card' data-aos="fade-up" data-aos-delay={100} data-aos-once={true}>
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
                <p className='text-center title2 introduce-title'>Vì sao chúng tôi là lựa chọn hàng đầu</p>
                <div className='introduce'>
                    <img src={mobileIcon} data-aos="fade-right" data-aos-once={true}></img>
                    <div className='paragraph' data-aos="fade-left" data-aos-once={true} data-aos-delay={200}>
                        <div>
                            <p className='title'>Trải nghiệm trên di động</p>
                            <p>Landkit is built to make your life easier. Variables, build tooling, documentation, and reusable components.</p>
                        </div>
                    </div>
                </div>
                <div className='introduce'>
                    <div className='paragraph' data-aos="fade-right" data-aos-once={true} data-aos-delay={200}>
                        <div>
                            <p className='title'>Bảo mật tuyệt đối</p>
                            <p>Designed with the latest design trends in mind. Landkit feels modern, minimal, and beautiful.</p>
                        </div>

                    </div>
                    <img src={vaultIcon} data-aos="fade-left" data-aos-once={true}></img>
                </div>
                <div className='introduce'>
                    <img src={supportIcon} data-aos="fade-right" data-aos-once={true}></img>
                    <div className='paragraph' data-aos="fade-left" data-aos-once={true} data-aos-delay={200}>
                        <div>
                            <p className='title'>Hỗ trợ khách hàng</p>
                            <p>We've written extensive documentation for components and tools, so you never have to reverse engineer anything.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
