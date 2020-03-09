import React, { useState, useEffect } from "react";
//import the components we will need
import ArticleCard from "./ArticleCard";
import API from "../../modules/ApiManager";

const ArticleList = props => {
  // The initial state is an empty array
  const [articles, setArticles] = useState([]);

  const getArticles = str => {
    // After the data comes back from the API, we
    //  use the setArticles function to update state
    return API.get(str).then(articlesFromAPI => {
      setArticles(articlesFromAPI);
    });
  };

  const deleteArticle = (id, str) => {
      
    API.delete(id, str).then(() =>
      API.get(str).then(setArticles)
    );
  };

  // got the articles from the API on the component's first render
  useEffect(() => {
    getArticles("articles");
  }, []);

  // Finally we use map() to "loop over" the articles array to show a list of animal cards
  return (
    <React.Fragment>
      <section className="section-content">
        <button
          type="button"
          className="btn"
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
