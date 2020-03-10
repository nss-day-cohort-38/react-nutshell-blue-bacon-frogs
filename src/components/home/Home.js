import React, { useState, useEffect } from "react"
import API from "../../modules/ApiManager"
import TaskCard from "../tasks/TaskCard"

const Home = () => {

    const userId = parseInt(sessionStorage.getItem("userId"))

    const [tasks, setTasks] = useState([])
    const [fetchedMessages, setMessages] = useState([])
    const [fetchedEvents, setEvents] = useState([])
    const [fetchedArticles, setArticles] = useState([])

    const taskFetch = () => {
        API.getWithId("tasks", userId)
            .then(taskArray => {
                taskArray.sort(function (a, b) {
                    if (a.expectedCompletionDate < b.expectedCompletionDate) {
                        return -1;
                    }
                    if (a.expectedCompletionDate > b.expectedCompletionDate) {
                        return 1;
                    }
                    return 0;
                })
                console.log(taskArray)
                setTasks(taskArray[0])

            })
    }

    const fetchEvents = () => {
        API.getWithId("events", userId)
            .then(eventsArray => {
                console.log(eventsArray)
                eventsArray.sort(function (a, b) {
                    if (a.date < b.date) {
                        return -1;
                    }
                    if (a.date > b.date) {
                        return 1;
                    }
                    return 0;

                })
                setEvents(eventsArray[0])
                console.log(eventsArray)
            })
    }

    const fetchArticles = () => {
        API.getWithId("articles", userId)
            .then(articlesArray => {
                const randomIndex = Math.floor(Math.random() * articlesArray.length);
                const randomArticle = articlesArray[randomIndex];
                setArticles(randomArticle)
            })
    }

    useEffect(() => {
        taskFetch();
        fetchEvents();
        fetchArticles();

    }, []);

    return (
        <>
            <div className="homeContainer">
                {tasks === undefined ? <h1>No Task</h1> : <h1>{tasks.task}</h1>}
                {fetchedEvents === undefined ? <h1>No Events</h1> : <h1>{fetchedEvents.name}</h1>}
                {fetchedArticles === undefined ? <h1>No Articles</h1> : <h1>{fetchedArticles.title}</h1>}
            </div>
        </>
    )
}

export default Home