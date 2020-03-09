import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./home/Home";
import UserForm from "./auth/NewUser";
import EventList from "./events/EventList";
import EventForm from "./events/EventForm";
import EventEditForm from "./events/EventEditForm";

const AppViews = props => {
  const hasUser = props.hasUser;
  const setUser = props.setUser;
  return (
    <React.Fragment>
      <Route
        exact
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/userForm"
        render={props => {
          return <UserForm setUser={setUser} {...props} />;
        }}
      />
      <Route
        exact
        path="/"
        render={props => {
          if (hasUser) {
            return <Home />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/events"
        render={props => {
          if (hasUser) {
            return <EventList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/events/new"
        render={props => {
          if (hasUser) {
            return <EventForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/events/:eventId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return <EventEditForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </React.Fragment>
  );
};

export default AppViews;
