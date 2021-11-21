import { Redirect, Route } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { getUser } from '../graphql/user';

export default function AdminRoute({ children, ...rest }) {
    const { loading, error, data } = useQuery(getUser);

    if (loading)
        return children
    else
        return (
            <Route
                {...rest}
                render={() =>
                    data?.user?.user_role ? children : <Redirect to="/Auth/Login" />
                }
            />
        );
}