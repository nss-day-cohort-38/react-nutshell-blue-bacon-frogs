import React, { useState } from "react";
import API from "../../modules/ApiManager"
import { Route, Link } from "react-router-dom"
import "../Nutshell.css"

const Login = props => {
  const [credentials, setCredentials] = useState({email: "", password: "" }); //initial state equal to an object with keys email and password that have empty string value
  //handleFieldChange handles each state update and targets the values of email and password
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
            props.history.push("/")
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
        <div className="loginButtons">
        <button
          type="submit"
          onClick={handleLogin}
        >Submit</button>
        
          <Link to="/register" style={{ textDecoration: 'none' ,  color: '#160D58'}}  >
            <button
            >Create Account</button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
