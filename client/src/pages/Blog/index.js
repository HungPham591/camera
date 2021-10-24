import React from 'react';
import "./css/index.scss";

export default function Blog(props) {
    const tags = ['CAMERA', 'RECORDING', 'ENVIRONMENT', 'API', 'MOBILE']
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
                <div className='custom-card'>
                    <p className='title'>Hướng dẫn chuyển đổi chế độ xem liveview sang WebRTC khi Flash Player ngừng hỗ trợ trên trình duyệt web</p>
                    <p className='content'>Sau ngày 31/12/2020, Adobe Flash Player sẽ ngừng hỗ trợ trên tất cả các trình duyệt. Để đảm bảo việc xem trực tiếp camera trên trình duyệt web vẫn diễn ra bình thường, vCloudcam khuyến khích người dùng thực hiện các thiết lập sau:</p>
                    <button>Xem thêm</button>
                </div>
                <div className='custom-card'>
                    <p className='title'>Hướng dẫn chuyển đổi chế độ xem liveview sang WebRTC khi Flash Player ngừng hỗ trợ trên trình duyệt web</p>
                    <p className='content'>Sau ngày 31/12/2020, Adobe Flash Player sẽ ngừng hỗ trợ trên tất cả các trình duyệt. Để đảm bảo việc xem trực tiếp camera trên trình duyệt web vẫn diễn ra bình thường, vCloudcam khuyến khích người dùng thực hiện các thiết lập sau:</p>
                    <button>Xem thêm</button>
                </div>
                <div className='custom-card'>
                    <p className='title'>Hướng dẫn chuyển đổi chế độ xem liveview sang WebRTC khi Flash Player ngừng hỗ trợ trên trình duyệt web</p>
                    <p className='content'>Sau ngày 31/12/2020, Adobe Flash Player sẽ ngừng hỗ trợ trên tất cả các trình duyệt. Để đảm bảo việc xem trực tiếp camera trên trình duyệt web vẫn diễn ra bình thường, vCloudcam khuyến khích người dùng thực hiện các thiết lập sau:</p>
                    <button>Xem thêm</button>
                </div>
                <div className='custom-card'>
                    <p className='title'>Hướng dẫn chuyển đổi chế độ xem liveview sang WebRTC khi Flash Player ngừng hỗ trợ trên trình duyệt web</p>
                    <p className='content'>Sau ngày 31/12/2020, Adobe Flash Player sẽ ngừng hỗ trợ trên tất cả các trình duyệt. Để đảm bảo việc xem trực tiếp camera trên trình duyệt web vẫn diễn ra bình thường, vCloudcam khuyến khích người dùng thực hiện các thiết lập sau:</p>
                    <button>Xem thêm</button>
                </div>
            </div>
        </div>
    );
}