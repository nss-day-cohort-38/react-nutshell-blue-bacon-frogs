import React, {useState} from "react"

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) //initial state equal to an object with keys email and password that have empty string value
    //handleFieldChange handles each state update and targets the values of email and password
    const handleFieldChange = (evt) => {
        //a variable which takes in email and password
        const stateToChange = {...credentials}
        stateToChange[evt.target.id] = evt.target.value
        //the state of the credentials changes to the value of email and password
        setCredentials(stateToChange)
    }
    const handleLogin = (evt) => {
        evt.preventDefault();
        //props from appviews to set user equal to the value of credentials
        props.setUser(credentials)
        //props from route 
        props.history.push("/home")
    }

    return (
        <form onSubmit={handleLogin}>
            <fieldset>
            <h3>Sign in</h3>
            <input onChange={handleFieldChange} 
            type="email" 
            id="email"
            placeholder="email address"></input>
            <label htmlFor="inputEmail">Email Address</label>
            </fieldset>
            <fieldset>
            <input onChange={handleFieldChange} 
            type="password"
            id="password"
            placeholder="password"
            ></input>
            <label htmlFor="inputPassword">Password</label>
            </fieldset>
        <button type="submit">Submit</button>
        </form>
    )

}

export default Login