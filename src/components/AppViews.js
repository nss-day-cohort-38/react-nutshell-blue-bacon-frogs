import React from "react"
import {Route, Redirect} from "react-router-dom"
import Login from "./auth/Login"
import Home from "./home/Home"
import TaskForm from "../components/tasks/TaskForm"
import TaskList from "../components/tasks/TaskList"
import TaskEditForm from "../components/tasks/TaskEditForm"

const AppViews = (props) => {
    const hasUser = props.hasUser;
    const setUser = props.setUser;
    return (
    <React.Fragment>
        <Route path="/login" render={props => {  
        return <Login setUser={setUser} {...props} />
        }}/> 
        <Route exact path="/" render={props => {
            if(hasUser) {
                return <Home />
            } else {
            return <Redirect to="/login"/>
            }
        }}/>
        <Route exact path="/tasks" render={props => {
            if(hasUser) {
                return <TaskList {...props}/>
            } else {
            return <Redirect to="/login"/>
            }
        }}/>
        <Route path="/tasks/new" render={props => {
            if(hasUser) {
                return <TaskForm {...props}/>
            } else {
            return <Redirect to="/login"/>
            }
        }}/>
        <Route path="/tasks/:taskId(\d+)/edit" render={props => {
            if(hasUser) {
                return <TaskEditForm {...props}/>
            } else {
            return <Redirect to="/login"/>
            }
        }}/>
    </React.Fragment>
    )
}

export default AppViews