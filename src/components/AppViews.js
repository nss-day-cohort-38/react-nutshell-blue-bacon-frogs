import React from "react"
import {Route, Redirect} from "react-router-dom"
import Login from "./auth/Login"
import Home from "./home/Home"

const AppViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    return (
    <React.Fragment>
        <Route path="/login" render={props => {  
        return <Login setUser={setUser} {...props} />
        }}/> 
        <Route path="/" render={props => {
            if(hasUser) {
                return <Home />
            } else {
            return <Redirect to="/login"/>
            }
        }}/>
    </React.Fragment>
    )
}

export default AppViews