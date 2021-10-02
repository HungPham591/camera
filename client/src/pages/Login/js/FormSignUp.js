import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";

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

export default connect(null, null)(FormSignUp);
