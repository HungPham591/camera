import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { actLoginRequest } from "../../../actions/loginAction";

function FormSignUp(props) {
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
