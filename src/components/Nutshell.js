import React, {useState} from "react"
import NavBar from "./nav/NavBar"
import AppViews from "./AppViews"
import API from "../modules/ApiManager.js"

const Nutshell = (props) => {
    const userId = parseInt(sessionStorage.getItem("userId"))
    const isAuthenticated = () => sessionStorage.getItem("userId") !== null; //begins with null credentials when function is called
    const [hasUser, setHasUser] = useState(isAuthenticated()); //begins with initial state of null

    const setUser = (user) => {
        sessionStorage.setItem("credentials", JSON.stringify(user));
        setHasUser(isAuthenticated()); //changing state to setting user
    }
    
    const clearUser = () => {
         const logoutTime = Date.now()
        sl
       
       
        
    }

    return (
        <>
        <NavBar hasUser={hasUser} clearUser={clearUser} {...props}/>
        <AppViews hasUser={hasUser} setUser={setUser} {...props}/>
        </>
    )
}

export default Nutshell