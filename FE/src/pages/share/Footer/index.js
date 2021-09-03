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
                                <a>Posts</a>
                                <a>Questions</a>
                                <a>Videos</a>
                                <a>Discussions</a>
                                <a>Tools</a>
                                <a>System Status</a>
                            </div>
                            <div className='col-lg-6' style={{ display: 'flex', flexDirection: 'column' }}>
                                <a>Organizations</a>
                                <a>Tags</a>
                                <a>Authors</a>
                                <a>Recommend System</a>
                                <a>Machine Learning</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h5 className='title'>SERVICES</h5>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <a>Posts</a>
                            <a>Questions</a>
                            <a>Videos</a>
                            <a>Discussions</a>
                            <a>Tools</a>
                            <a>System Status</a>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h5 className='title'>MOBILE APP</h5>
                        <div className='logo'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
