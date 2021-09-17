import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Suspense } from "react";

import Nav from '../pages/share/Nav';
import Footer from '../pages/share/Footer';
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Loader from "../pages/share/Loader";
const Camera = React.lazy(() => import("../pages/Camera"));
const Home = React.lazy(() => import("../pages/Home"));
const Map = React.lazy(() => import("../pages/Map"));
const Video = React.lazy(() => import("../pages/Video"));
const VideoDetail = React.lazy(() => import("../pages/VideoDetail"));
const User = React.lazy(() => import("../pages/User"));
const Admin = React.lazy(() => import('../pages/Admin'));

export default function MainNavigation(props) {
    const AuthContainer = () => {
        return (
            <div>
                <Route path="/Auth/Login" component={Login} />
                <Route path="/Auth/SignUp" component={SignUp} />
            </div>
        )
    }
    const AdminContainer = () => {
        return (
            <div>
                <Route exact path='/Admin/' component={Admin} />
            </div>
        )
    }
    const DefaultContainer = () => (
        <div>
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/Map" component={Map} />
            <Route path="/Camera/:id" component={Camera} />
            <Route exact path="/Video" component={Video} />
            <Route path="/Video/:id" component={VideoDetail} />
            <Route path="/User" component={User} />
            <Footer />
        </div>
    )
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/Auth" component={AuthContainer} />
                    <Route path="/Admin" component={AdminContainer} />
                    <Route component={DefaultContainer} />
                </Switch>
            </Suspense>
        </Router>
    )
}