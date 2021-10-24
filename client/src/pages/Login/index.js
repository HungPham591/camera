import React, { useState } from "react";
import "./css/Login.scss";
import { Link, useHistory } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useForm } from 'react-hook-form';
import { signin } from '../../graphql/user';
import { useMutation } from '@apollo/client';

export default function LogIn(props) {
    const history = useHistory();
    const [progress, setProgress] = useState(0);

    const onCompleted = ({ signin }) => {
        if (signin?.user_role) history.replace('/Admin');
        else if (signin) history.replace('/');
        else onError();
    }
    const onError = () => {
        setProgress(100);
        alert('Login fail!!!');
    }

    const [signinAction] = useMutation(signin, { onCompleted, onError })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = ({ user_name, user_pass }) => {
        setProgress(60);
        const BODY = { user_name, user_pass }
        signinAction({ variables: BODY });
    }

    return (
        <div id="Login">
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <img />
            <div className='right-pane'>
                <div className="login-form">
                    <div className="header">
                        <p className="title">Log in</p>
                        <p className="subtitle">
                            Create an account?{" "}
                            <Link className="signin" to="/Auth/SignUp">
                                Sign up
                            </Link>
                        </p>
                    </div>
                    <form className="body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="formGroup">
                            <input type="text" {...register('user_name', { required: true })} placeholder="Name" />
                        </div>
                        <div className="formGroup">
                            <input type="text" {...register('user_pass', { required: true })} placeholder="Password" />
                        </div>
                        <div className="formGroup">
                            <button type='submit' className="btnLogin">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
