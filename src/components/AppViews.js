import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./home/Home";
import ArticleList from "./articles/ArticleList";
import ArticleEditForm from "./articles/ArticleEditForm";
import ArticleForm from "./articles/ArticleForm"

const AppViews = props => {
  const hasUser = props.hasUser;
  const setUser = props.setUser;
  return (
    <React.Fragment>
      <Route
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route
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
    </React.Fragment>
  );
};

export default AppViews;
