import React, { useState } from "react";
import API from "../../modules/ApiManager"

const RegisterForm = props => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" }); //initial state equal to an object with keys email and password that have empty string value

  const handleFieldChange = evt => {
    const stateToChange = { ...credentials };
    stateToChange[evt.target.id] = evt.target.value;
    setCredentials(stateToChange);
  };

  const handleRegister = evt => {
    evt.preventDefault();
    props.setUser(credentials);
    API.get("users")
      .then(users => {
        for (let i = 0; i < users.length; i++) {
          if (users[i].email === credentials.email) {
            console.log("email already exists")
            props.history.push("/register")
          } else {
            API.save("credentials", "users")
            props.history.push("/")
          }
        }
      })
  };

  return (
    <>
      <div>
        <h3>Sign in</h3>
        <label htmlFor="inputName">Name</label>
        <input
          onChange={handleFieldChange}
          type="name"
          id="name"
          placeholder="full name"
        ></input>
      </div>
      <div>
        <label htmlFor="inputEmail">Email Address</label>
        <input
          onChange={handleFieldChange}
          type="email"
          id="email"
          placeholder="email address"
        ></input>
      </div>
      <div>
        <label htmlFor="inputPassword">Password</label>
        <input
          onChange={handleFieldChange}
          type="password"
          id="password"
          placeholder="password"
        ></input>
        <div>
          <button
            type="submit"
            onClick={handleRegister}
          >Submit</button>
        </div>
        <div>
          <button
            type="submit"
            
          >Already A User?</button>
        </div>
      </div>
      </>
    
  );
};

export default RegisterForm;
