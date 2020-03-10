import React, { useState, useEffect } from "react";
//import the components we will need
import ArticleCard from "./ArticleCard";
import API from "../../modules/ApiManager";

const ArticleList = props => {
  // The initial state is an empty array
  const [articles, setArticles] = useState([]);

  const getArticles = (str, userId) => {
    // After the data comes back from the API, we
    //  use the setArticles function to update state
    return API.getWithId(str, userId).then(articlesFromAPI => {
      sortArticles(articlesFromAPI);
      setArticles(articlesFromAPI);
    });
  };
  const sortArticles = articlesArray => {
    articlesArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const deleteArticle = (id, str) => {
    API.delete(id, str).then(() =>
      API.getWithId(str, sessionStorage.getItem("userId")).then(
        articlesFromAPI => {
          sortArticles(articlesFromAPI);
          setArticles(articlesFromAPI);
        }
      )
    );
  };

  // got the articles from the API on the component's first render
  useEffect(() => {
    getArticles("articles", sessionStorage.getItem("userId"));
  }, []);

  // Finally we use map() to "loop over" the articles array to show a list of animal cards
  return (
    <React.Fragment>
      <section className="addSectionContainer">
        <button
          type="button"
          className="addSection"
          onClick={() => {
            props.history.push("/articles/new");
          }}
        >
          Add Article
        </button>
      </section>

      <div className="container-cards">
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            deleteArticle={deleteArticle}
            {...props}
          />
        ))}
      </div>
    </React.Fragment>
  );
};
export default ArticleList;
