import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Suspense } from "react";

import Login from "../pages/Login";
import Loader from "../pages/share/Loader";
const Camera = React.lazy(() => import("../pages/Camera"));
const Home = React.lazy(() => import("../pages/Home"));
const Map = React.lazy(() => import("../pages/Map"));
const Report = React.lazy(() => import("../pages/Report"));
const User = React.lazy(() => import("../pages/User"));
const Video = React.lazy(() => import("../pages/Video"));

export default function MainNavigation(props) {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/Login">
                        <Login />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/Home">
                        <Home />
                    </Route>
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
                </Switch>
            </Suspense>
        </Router>
    )
}