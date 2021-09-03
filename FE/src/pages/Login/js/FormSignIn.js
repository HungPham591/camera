import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actLoginRequest } from "../../../actions/loginAction";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';

function FormSignIp(props) {
    let history = useHistory();
    let data = { camera_public: false };

    const onSuccess = async (googleUser) => {
        let token = await googleUser.getAuthResponse();
        let user = {
            user_gmail: googleUser.getBasicProfile().getEmail(),
            user_pass: '',
            google_id: googleUser.getBasicProfile().getId(),
            google_token: token.access_token,
        };
        let account = (await axios.post("http://localhost:4000/user/insert", user)).data;
        props.setUser(account);
        history.replace('/')
    };
    const onFailure = (error) => {
        console.log(error);
    };
    const submitLogin = () => {
        let { user_gmail, user_pass } = data;
        let user = { user_gmail, user_pass };
        props.setUser(user);
    };

    return (
        <div className="card">
            <div className="header">
                <p className="title">Create account</p>
                <p className="subtitle">
                    Already have an account?{" "}
                    <Link className="signin" to="/SignUp">
                        Sign in
                    </Link>
                </p>
            </div>
            <div className="body">
                <div className="formGroup">
                    <input type="text" placeholder="Gmail" />
                </div>
                <div className="formGroup">
                    <input type="text" placeholder="Password" />
                </div>
                <div className="formGroup">
                    <button className="btnLogin" onClick={submitLogin}>
                        Sign Up
                    </button>
                </div>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GG_SIGNIN_CLIENT_ID}
                    render={renderProps => (
                        <button id="btnGoogle" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google button</button>
                    )}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                />
            </div>
        </div>
    );
}
const mapStateToProps = (dispatch) => {
    return {
        setUser: (user_gmail, user_pass) =>
            dispatch(actLoginRequest(user_gmail, user_pass)),
    };
};

export default connect(null, mapStateToProps)(FormSignIp);
