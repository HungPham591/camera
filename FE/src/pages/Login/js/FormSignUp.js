import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { gapi } from "gapi-script";
import { actLoginRequest } from "../../../actions/loginAction";

function FormSignUp(props) {
    let data = { camera_public: false };

    const onSuccess = async (googleUser) => {
        let token = await googleUser.getAuthResponse();
        let user = {
            user_gmail: googleUser.getBasicProfile().getEmail(),
            user_pass: googleUser.getBasicProfile().getId(),
            user_save: [],
            google_id: googleUser.getBasicProfile().getId(),
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            expiry_date: token.expires_at,
        };
        let account = (await axios.post("/user/insert", user)).data;
        props.setUser(account);
    };
    const onFailure = (error) => {
        console.log(error);
    };
    useEffect(() => {
        gapi.signin2.render("my-signin2", {
            scope:
                "profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/drive",
            width: 240,
            height: 50,
            longtitle: true,
            theme: "dark",
            onsuccess: onSuccess,
            onfailure: onFailure,
        });
    });

    const btnCreateAccountClick = () => {
        let { user_gmail, user_pass } = data;
        axios.post("/user/insert", {
            user_gmail: user_gmail,
            user_pass: user_pass,
            user_share: [],
            user_save: [],
        });
    };
    const submitLogin = () => {
        let { user_gmail, user_pass } = data;
        let user = { user_gmail, user_pass };
        props.setUser(user);
    };

    return (
        <div className='card'>
            <div className='card__header'>
                <p className='card__title'>

                </p>
                <p className='card_subtitle'>

                </p>
            </div>
            <div className='card__body'>
                <input type='text' placeholder='account'></input>
                <input type='text' placeholder='account'></input>
                <input type='text' placeholder='account'></input>
                <button></button>
                <div id="my-signin2">asdfdsf</div>
            </div>
            <div className='card_footer'>
                <input type='checkbox'></input>
                <p></p>
            </div>
        </div>
    )
}
const mapStateToProps = (dispatch) => {
    return {
        setUser: (user_gmail, user_pass) =>
            dispatch(actLoginRequest(user_gmail, user_pass)),
    };
};

export default connect(null, mapStateToProps)(FormSignUp);
