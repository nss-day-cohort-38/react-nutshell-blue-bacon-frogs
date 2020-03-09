import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import Home from "./home/Home"
import ChatBox from "./messages/ChatBox"
import RegisterForm from "./auth/RegisterForm"

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
                    return <Redirect to="/login" setUser={setUser} hasUser={hasUser}/>
                }
            }} />
            <Route path="/messages" render={props => {
                return <ChatBox userId={loggedInUser} {...props} />
            }} />
            <Route path="/register" render={props => {
                return <RegisterForm setUser={setUser} {...props}/>
            }}/>
        </React.Fragment>
    )
}

export default AppViews