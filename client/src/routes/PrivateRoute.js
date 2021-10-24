import { Redirect, Route } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { getUser } from '../graphql/user';

export default function PrivateRoute({ children, ...rest }) {
    const { loading, error, data } = useQuery(getUser);
    return (
        <Route
            {...rest}
            render={() =>
                data?.user?._id ? children : <Redirect to="/Auth/Login" />
            }
        />
    );
}