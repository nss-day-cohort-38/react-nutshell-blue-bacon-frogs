import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./home/Home";
import EventList from "./events/EventList";
import EventForm from "./events/EventForm";
import EventEditForm from "./events/EventEditForm";
import ArticleList from "./articles/ArticleList";
import ArticleEditForm from "./articles/ArticleEditForm";
import ArticleForm from "./articles/ArticleForm";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskEditForm from "../components/tasks/TaskEditForm";
import ChatBox from "./messages/ChatBox";
import RegisterForm from "./auth/RegisterForm";
import FriendshipList from "./friendships/FriendshipList"
import SearchFriendCard from "./friendships/SearchFriendCard";
import SearchFriendButton from "./friendships/SearchFriendButton";
import MessageEditForm from "./messages/MessageEditForm"

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
        path="/home"
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
        path="/articles"
        render={props => {
          if (hasUser) {
            return <ArticleList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/articles/:articleId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return <ArticleEditForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/articles/new"
        render={props => {
          return <ArticleForm {...props} />;
        }}
      />

      <Route
        path="/messages"
        render={props => {
          return <ChatBox  {...props} />;
        }}
      />
      <Route
        path="/messages/:messageId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return <MessageEditForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route
        path="/register"
        render={props => {
          return <RegisterForm setUser={setUser} {...props} />;
        }}
      />

      <Route
        exact
        path="/tasks"
        render={props => {
          if (hasUser) {
            return <TaskList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/tasks/new"
        render={props => {
          if (hasUser) {
            return <TaskForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/tasks/:taskId(\d+)/edit"
        render={props => {
          if (hasUser) {
            return <TaskEditForm {...props} />;
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
      <Route
        exact
        path="/friendships"
        render={props => {
          if (hasUser) {
            return <FriendshipList {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
      exact
      path="/friendships/search"
      render={props => {
        if(hasUser) {
          return <SearchFriendCard {...props}/>
        } else {
          return <Redirect to="/login"/>
        }
      }}
      />
    </React.Fragment>
  );
};

export default AppViews;
