import React, { useState, useEffect } from "react";
import API from "../../modules/ApiManager";
//import "./ArticleForm.css";

const ArticleEditForm = props => {
  const [article, setArticle] = useState({ title: "", synopsis: "", timestamp: "", url:""});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...article };
    stateToChange[evt.target.id] = evt.target.value;
    setArticle(stateToChange);
  };

  const updateExistingArticle = evt => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedArticle = {
      id: props.match.params.articleId,
      title: article.title,
      synopsis: article.synopsis,
      timestamp: parseInt(article.timestamp),
      url: article.url,
      userId: parseInt(article.userId)
    };

    API.update(editedArticle,"articles").then(() =>
      props.history.push("/articles")
    );
  };

  useEffect(() => {
    API.edit(props.match.params.articleId,"articles").then(article => {
        setArticle(article);
        setIsLoading(false);
      
    });
  }, []);

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="title"
              value={article.title}
            />
            <label htmlFor="title">Article title</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="synopsis"
              value={article.synopsis}
            />
            <label htmlFor="synopsis">Synopsis</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="url"
              value={article.url}
            />
            <label htmlFor="url">Url</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingArticle}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ArticleEditForm;