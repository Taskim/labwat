import React from 'react'
import { connect } from 'react-redux'
import {
    Redirect,
    Route,
    withRouter,
    RouteComponentProps,
} from 'react-router-dom'

// todo replace with global state
type State = {
    session: { userId: string }
}

type NonRouterNorReduxProps = {
    path: string
    component: any
}

interface IStateProps {
    loggedIn: boolean
}

type Props = IStateProps & RouteComponentProps<any> & NonRouterNorReduxProps

class Auth extends React.Component<Props> {
    render() {
        const { loggedIn, path, component: Component } = this.props
        return (
            <Route
                path={path}
                render={(props) =>
                    loggedIn ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        )
    }
}
const Protected = ({ loggedIn, path, component: Component }: Props) => (
    <Route
        path={path}
        render={(props) =>
            loggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
)

const mapStateToProps = ({ session: { userId } }: State): IStateProps => ({
    loggedIn: Boolean(userId),
})

export const AuthRoute = withRouter(
    connect<IStateProps, {}, NonRouterNorReduxProps, State>(mapStateToProps)(
        Auth
    )
)

export const ProtectedRoute = withRouter(
    connect<IStateProps, {}, NonRouterNorReduxProps, State>(mapStateToProps)(
        Protected
    )
)
