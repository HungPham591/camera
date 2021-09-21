import React, { useMemo } from "react";
import { connect } from "react-redux";
import { actGetLocationRequest } from "./actions/locationAction";
import MainNavigation from "./routes";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'


const link = createHttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

function App(props) {
    useMemo(() => {
        props.getLocation();
    }, []);

    return (
        <ApolloProvider client={client}>
            <MainNavigation />
        </ApolloProvider >
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLocation: () => dispatch(actGetLocationRequest()),
    };
};
export default connect(null, mapDispatchToProps)(App);
