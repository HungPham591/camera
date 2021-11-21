import React, { useRef, useState } from "react";
import "./css/index.scss";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { signup } from '../../graphql/user';
import { useMutation } from '@apollo/client';
import LoadingBar from 'react-top-loading-bar';


export default function SignUp(props) {
    const [progress, setProgress] = useState(0);

    const onCompleted = ({ signup }) => {
        if (signup) {
            window.location.assign('http://localhost:4002/auth/google');
        }
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
                            <input type='email' {...register('user_name', { required: true })} placeholder="Email" />
                            {errors.user_name && <p className='text-danger'>User name is required.</p>}
                        </div>
                        <div className="formGroup">
                            <input type='password' {...register('user_pass', { required: true })} placeholder="Password" />
                            {errors.user_pass && <p className='text-danger'>Password is required.</p>}
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
