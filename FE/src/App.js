import React, { useMemo } from "react";
import { connect } from "react-redux";
import { actGetLocationRequest } from "./actions/locationAction";
import MainNavigation from "./routes";
import { actSigninSuccess } from "../src/actions/authAction";
import { getUserInfo } from '../src/services/user';

function App(props) {
    const getUser = async () => {
        let user = await getUserInfo(null);
        props.signInSuccess(user);
    }
    useMemo(() => {
        props.getLocation();
        getUser();
    }, []);

    return (
        <MainNavigation />
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLocation: () => dispatch(actGetLocationRequest()),
        signInSuccess: (user) => dispatch(actSigninSuccess(user)),
    };
};
export default connect(null, mapDispatchToProps)(App);
