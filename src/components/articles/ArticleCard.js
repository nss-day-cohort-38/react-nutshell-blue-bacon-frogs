import React from "react";
//import "./Article.css";
//import { Link } from "react-router-dom";

const ArticleCard = props => {
  return ( 
      <div className="articleCard-content">
        <div>
        <h3>
          <span className="content-articleName">{props.article.title}</span>
        </h3>
        <p>Synopsis: {props.article.synopsis}<br></br><span><a className="articleLink"href={props.article.url} target="">Link</a></span></p>
        <div className="articleCrudButtons">
        <button
          type="button" className="articleEditButton"
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
      </div>
  );
};

export default ArticleCard;
