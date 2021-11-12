import React from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Suspense } from "react";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import Nav from '../pages/share/Nav';
import Footer from '../pages/share/Footer';
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Loader from "../pages/share/Loader";
const Camera = React.lazy(() => import("../pages/Camera"));
const Home = React.lazy(() => import("../pages/Home"));
const Map = React.lazy(() => import("../pages/Map"));
const Blog = React.lazy(() => import("../pages/Blog"));
const BlogDetail = React.lazy(() => import("../pages/BlogDetail"));
const VideoDetail = React.lazy(() => import("../pages/VideoDetail"));
const User = React.lazy(() => import("../pages/User"));
const PageNotFound = React.lazy(() => import("../pages/NotFound"));
const Admin = React.lazy(() => import('../pages/Admin'));
const CameraSetting = React.lazy(() => import('../pages/CameraSetting'));
const Location = React.lazy(() => import('../pages/Location'));

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
                <Route path='/Admin/' component={Admin} />
            </div>
        )
    }
    const DefaultContainer = () => (
        <div>
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/Map" component={Map} />
            <Route path="/Camera/:id" component={Camera} />
            <Route path="/Blog" component={Blog} />
            <Route path='/BlogDetail' component={BlogDetail} />
            <Route path="/Video/:id" component={VideoDetail} />
            <Route path="/CameraSetting/:id" component={CameraSetting} />
            <Route path="/Location/:id" component={Location} />
            <PrivateRoute path="/User">
                <User />
            </PrivateRoute>
            <Footer />
        </div>
    )
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/Auth" component={AuthContainer} />
                    <AdminRoute path="/Admin">
                        <AdminContainer />
                    </AdminRoute>
                    <Route path='/' component={DefaultContainer} />
                    <Route path='*' component={PageNotFound} />
                </Switch>
            </Suspense>
        </Router>
    )
}