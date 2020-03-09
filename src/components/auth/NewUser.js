import React, { useState } from "react";
import API from "../../modules/ApiManager";

const UserForm = props => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleUserFieldChange = evt => {
    const stateToChange = { ...user };
    stateToChange[evt.target.id] = evt.target.value;
    setUser(stateToChange);
  };

  const makeNewUser = evt => {
    evt.preventDefault();
    if (
      user.userName === "" ||
      user.email === "" ||
      user.password === ""
    ) {
      alert("Please complete all fields.");
    } else {
      setIsLoading(true);
      API.save(user, "users").then(() => props.history.push("/"));
    }
  };

  return (
      <form>
        <fieldset>
          <h3>Create New Account</h3>
          <input
            onChange={handleUserFieldChange}
            type="username"
            id="username"
            placeholder="username"
          ></input>
          <label htmlFor="inputUsername">Username</label>
        </fieldset>
        <fieldset>
          <input
            onChange={handleUserFieldChange}
            type="email"
            id="email"
            placeholder="email address"
          ></input>
          <label htmlFor="inputEmail">Email Address</label>
        </fieldset>
        <fieldset>
          <input
            onChange={handleUserFieldChange}
            type="password"
            id="password"
            placeholder="password"
          ></input>
          <label htmlFor="inputPassword">Password</label>
          <h3> </h3>
          <button type="submit" disabled={isLoading} onClick={makeNewUser}>
            Submit
          </button>
        </fieldset>
      </form>
  );
};

export default UserForm;
