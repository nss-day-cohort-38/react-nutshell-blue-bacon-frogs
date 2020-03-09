import React from "react";
//import "./Article.css";
//import { Link } from "react-router-dom";

const ArticleCard = props => {
  return (
    <div className="card">
      <div className="card-content">
        <h3>
          <span className="content-articleName">{props.article.title}</span>
        </h3>
        <p>Synopsis: {props.article.synopsis}<br></br><span><a href={props.article.url} target="_blank">Link</a></span></p>
        <button
          type="button"
          onClick={() => props.history.push(`/articles/${props.article.id}/edit`)}
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => props.deleteArticle(props.article.id, "articles")}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
