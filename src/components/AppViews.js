import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import Home from "./home/Home"
import ChatBox from "./messages/ChatBox"

const AppViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    let loggedInUser = 1;
    return (
        <React.Fragment>
            <Route path="/login" render={props => {
                return <Login setUser={setUser} {...props} />
            }} />
            <Route path="/" render={props => {
                if (hasUser) {
                    return <Home />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
            <Route path="/messages" render={props => {
                return <ChatBox userId={loggedInUser} {...props} />
            }} />
        </React.Fragment>
    )
}

export default AppViews