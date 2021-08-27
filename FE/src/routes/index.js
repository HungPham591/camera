import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Suspense } from "react";

import Nav from '../pages/share/Nav';
import Footer from '../pages/share/Footer';
import Login from "../pages/Login";
import Loader from "../pages/share/Loader";
const Camera = React.lazy(() => import("../pages/Camera"));
const Home = React.lazy(() => import("../pages/Home"));
const Map = React.lazy(() => import("../pages/Map"));
const Report = React.lazy(() => import("../pages/Report"));
const User = React.lazy(() => import("../pages/User"));
const Video = React.lazy(() => import("../pages/Video"));

export default function MainNavigation(props) {
    const LoginContainer = () => (
        <div>
            <Route path="/Login">
                <Login />
            </Route>
        </div>
    )
    const HomeContainer = () => (
        <div>
            <Nav nav={true} />
            <Route exact path="/">
                <Home />
            </Route>
            <Footer />
        </div>
    )
    const DefaultContainer = () => (
        <div>
            <Nav />
            <Route path="/Map">
                <Map />
            </Route>
            <Route path="/Camera/:id">
                <Camera />
            </Route>
            <Route path="/Report/:id">
                <Report />
            </Route>
            <Route path="/Video/:id">
                <Video />
            </Route>
            <Route path="/User">
                <User />
            </Route>
            <Footer />
        </div>
    )
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route exact path="/Login" component={LoginContainer} />
                    <Route exact path="/" component={HomeContainer} />
                    <Route component={DefaultContainer} />
                </Switch>
            </Suspense>
        </Router>
    )
}