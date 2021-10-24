import React, { useState } from "react";
import "./css/index.scss";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { useForm } from 'react-hook-form';
import { signup } from '../../graphql/user';
import { useMutation } from '@apollo/client';
import LoadingBar from 'react-top-loading-bar';


export default function SignUp(props) {
    const history = useHistory();
    const [progress, setProgress] = useState(0);

    const onCompleted = ({ signup }) => {
        if (signup) history.replace('/');
        else onError();
    }
    const onError = () => {
        alert('Signup fail!!!');
        setProgress(100);
    }

    const [signupAction] = useMutation(signup, { onCompleted, onError });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ user_name, user_pass }) => {
        const BODY = { user_name, user_pass }
        signupAction({ variables: BODY });
        setProgress(60);
    }

    const onSuccess = async (res) => {
        console.log(await res.getAuthResponse())
    };
    const onFailure = (error) => {
        console.log(error);
    };

    return (
        <div id="SignUp">
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <img />
            <div className='right-pane'>
                <div className="form-signup">
                    <div className="header">
                        <p className="title">Create account</p>
                        <p className="subtitle">
                            Already have an account?{" "}
                            <Link className="signin" to="/Auth/Login">
                                Sign in
                            </Link>
                        </p>
                    </div>
                    <form className="body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="formGroup">
                            <input type="text" {...register('user_name', { required: true })} placeholder="Email" />
                        </div>
                        <div className="formGroup">
                            <input type="text" {...register('user_pass', { required: true })} placeholder="Password" />
                        </div>
                        <div className="formGroup">
                            <button type='submit' className="btnLogin">
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
                            scope="profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/drive"
                            accessType="offline"
                            // responseType="code"
                            prompt='consent'
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
