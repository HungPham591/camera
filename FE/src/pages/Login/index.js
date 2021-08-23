import React from "react";
import { connect } from "react-redux";
import { actLoginRequest } from "../../actions/loginAction";
import FormSignIn from "./js/FormSignIn";
import FormSignUp from "./js/FormSignUp";
import "./css/Login.scss";

function Login(props) {
    const form = () => {
        return <FormSignIn />;
    };
    return (
        <div id="Login">
            {form()}
        </div>
    );
}
const mapStateToProps = (dispatch) => {
    return {
        setUser: (user_gmail, user_pass) =>
            dispatch(actLoginRequest(user_gmail, user_pass)),
    };
};
export default connect(mapStateToProps)(Login);
