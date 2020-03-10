import React, { useState } from "react";
import API from "../../modules/ApiManager"
import { Route, Link } from "react-router-dom"
import "../Nutshell.css"

const Login = props => {
  const [credentials, setCredentials] = useState({email: "", password: "" }); //initial state equal to an object with keys email and password that have empty string value
  //handleFieldChange handles each state update and targets the values of email and password
  const[linkColor, setLinkColor] = useState()

  const handleFieldChange = evt => {
    //a variable which takes in email and password
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    //the state of the credentials changes to the value of email and password
    setCredentials(stateToChange);
  };
  const handleLogin = (evt) => {
    API.get("users")
      .then(users => {
        const user = users.find(user => user.email === credentials.email && 
          user.password === credentials.password)
          if (user !== undefined) {
            sessionStorage.setItem("userId", user.id)
            props.setUser(credentials)
            props.history.push("/home")
          } else {
            window.alert("try again")
          }
      })
  };

  return (
    <>
    <div className="loginForm">
        <div>
            <h3>Sign in</h3>
            <label htmlFor="inputEmail">Email Address: </label>
            <input
            onChange={handleFieldChange}
            type="email"
            id="email"
            placeholder="email address"
            ></input>
        
        <label htmlFor="inputPassword">Password:</label>
            <input
            onChange={handleFieldChange}
            type="password"
            id="password"
            placeholder="password"
            ></input>
            
            <button
            type="submit"
            onClick={handleLogin}
            >Submit</button>
            <p>Don't have an account? <span></span>
            <Link to="/register" style={{ textDecoration: 'none' }} className="signLink" >
                Sign up
            </Link> </p>
            
        </div>
      </div>
    </>
  );
};

export default Login;
