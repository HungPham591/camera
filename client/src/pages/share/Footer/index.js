import React, { useState, useEffect, useMemo } from "react";
import "./index.scss";

function Footer(props) {
    return (
        <div id='Footer' className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h5 className='title'>RESOURCES</h5>
                        <div className="row">
                            <div className='col-lg-6' style={{ display: 'flex', flexDirection: 'column' }}>
                                <p>Posts</p>
                                <p>Questions</p>
                                <p>Videos</p>
                                <p>Discussions</p>
                                <p>Tools</p>
                                <p>System Status</p>
                            </div>
                            <div className='col-lg-6' style={{ display: 'flex', flexDirection: 'column' }}>
                                <p>Organizations</p>
                                <p>Tags</p>
                                <p>Authors</p>
                                <p>Recommend System</p>
                                <p>Machine Learning</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h5 className='title'>SERVICES</h5>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <p>Posts</p>
                            <p>Questions</p>
                            <p>Videos</p>
                            <p>Discussions</p>
                            <p>Tools</p>
                            <p>System Status</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h5 className='title'>CONTACT</h5>
                        <div className='logo'></div>
                    </div>
                </div>
                <div>
                    <hr></hr>
                    <p className='rights-reserved'>© 2021 PHAM THANH HUNG. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
