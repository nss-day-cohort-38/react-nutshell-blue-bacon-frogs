import React, {useState} from "react"
import NavBar from "./nav/NavBar"
import AppViews from "./AppViews"

const Nutshell = () => {

    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null; //begins with null credentials when function is called
    const [hasUser, setHasUser] = useState(isAuthenticated()); //begins with initial state of null

    const setUser = (user) => {
        sessionStorage.setItem("credentials", JSON.stringify(user));
        setHasUser(isAuthenticated()); //changing state to setting user
    }

    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated()); //changing state after clearing session storage
    }

    return (
        <>
        <NavBar hasUser={hasUser} clearUser={clearUser} />
        <AppViews hasUser={hasUser} setUser={setUser}/>
        </>
    )
}

export default Nutshell