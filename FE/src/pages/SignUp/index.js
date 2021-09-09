import React, { useRef } from "react";
import "./css/index.scss";
import { connect } from "react-redux";
import { actSigninSuccess, actSigninFail } from "../../actions/authAction";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { signIn } from '../../services/user'

function SignUp(props) {
    const history = useHistory();
    const inputEmail = useRef(null);
    const inputPass = useRef(null)

    const onSuccess = async (googleUser) => {
        let token = await googleUser.getAuthResponse();
        console.log(token)
        const user = {
            user_gmail: googleUser.getBasicProfile().getEmail(),
            google_id: googleUser.getBasicProfile().getId(),
        };
        login(user)
    };
    const onFailure = (error) => {
        console.log(error);
    };
    const handleLogin = () => {
        const user_gmail = inputEmail.current.value;
        const user_pass = inputPass.current.value;

        if (user_gmail && user_pass) {
            const user = { user_gmail, user_pass }
            login(user)
        }
    };
    const login = async (user) => {
        let response = await signIn(user);
        if (response?.data?.success) {
            props.signInSuccess(user);
            history.replace('/')
        } else {
            alert('login fail')
        }
    }
    return (
        <div id="SignUp">
            <div className="card">
                <div className="header">
                    <p className="title">Create account</p>
                    <p className="subtitle">
                        Already have an account?{" "}
                        <Link className="signin" to="/Login">
                            Sign in
                        </Link>
                    </p>
                </div>
                <div className="body">
                    <div className="formGroup">
                        <input ref={inputEmail} type="text" placeholder="Email" />
                    </div>
                    <div className="formGroup">
                        <input ref={inputPass} type="text" placeholder="Password" />
                    </div>
                    <div className="formGroup">
                        <button className="btnLogin" onClick={handleLogin}>
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
        </div>
    );
}

const mapStateToProps = (dispatch) => {
    return {
        signInSuccess: (user) => dispatch(actSigninSuccess(user)),
    };
};

export default connect(null, mapStateToProps)(SignUp);
