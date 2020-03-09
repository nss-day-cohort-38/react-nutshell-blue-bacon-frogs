import React, { useState} from "react";
import API from "../../modules/ApiManager";
//import "./ArticleForm.css";

const ArticleForm = props => {
  const [article, setArticle] = useState({ title: "", synopsis: "", timestamp: 0, url:"", userId:  parseInt(sessionStorage.getItem("userId")) });
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = evt => {
    const stateToChange = { ...article };
    stateToChange[evt.target.id] = evt.target.value;
    setArticle(stateToChange);
  };

  /*  Local method for validation, set loadingStatus, create article 
  object, invoke the API post method, and redirect to the full article list
   */
  const constructNewArticle = evt => {
    evt.preventDefault();
    if (article.title === "" || article.synopsis === "" || article.url === "") {
      window.alert("Please fill out all fields");
    } else {
      setIsLoading(true);
      const timestamp = new Date().getTime()
      article.timestamp = timestamp
      // Create the article and redirect user to article list
      API.save(article,"articles")
      .then(() => props.history.push("/articles"));
    }
  };
 

  return (
    <>
      <form>
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="title"
              placeholder="Article title"
            />
            <label htmlFor="title">Title</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="synopsis"
              placeholder="Synopsis"
            />
            <label htmlFor="synopsis">Synopsis</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="url"
              placeholder="Url"
            />
            <label htmlFor="url">Url</label>
          </div>
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={constructNewArticle}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ArticleForm;