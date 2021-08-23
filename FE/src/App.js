import React, { useState, useEffect, useMemo } from "react";

import { connect } from "react-redux";

import { actGetLocationRequest } from "./actions/locationAction";

import MainNavigation from "./routes";

function App(props) {
    useMemo(() => {
        props.getLocation();
    }, []);
    return (
        <MainNavigation/>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLocation: () => dispatch(actGetLocationRequest()),
    };
};
export default connect(null, mapDispatchToProps)(App);
