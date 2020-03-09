import React, { useState } from "react";
import API from "../../modules/ApiManager"
import { Route, Link } from "react-router-dom"

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
    console.log("handleLogin called")

    //props from appviews to set user equal to the value of credentials
    props.setUser(credentials);
    console.log("credentials set")
    //props from route
    API.get("users")
      .then(users => {
        const user = users.find(user => user.email === credentials.email && 
          user.password === credentials.password)
          if (user !== undefined) {
            sessionStorage.setItem("userId", user.id)
            props.history.push("/")
          } else {
            window.alert("try again")
          }
      })
  };

  return (
    <>
      <div>
        <h3>Sign in</h3>
        <input
          onChange={handleFieldChange}
          type="email"
          id="email"
          placeholder="email address"
        ></input>
        <label htmlFor="inputEmail">Email Address</label>
      </div>
      <div>
        <input
          onChange={handleFieldChange}
          type="password"
          id="password"
          placeholder="password"
        ></input>
        <label htmlFor="inputPassword">Password</label>
        <h3> </h3>
        <button
          type="submit"
          onClick={handleLogin}
        >Submit</button>
        <div>
          <Link to="/register" >
            <button
            >Create Account</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
