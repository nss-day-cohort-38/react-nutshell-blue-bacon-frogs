import React, { useState, useEffect } from "react"
import API from "../../modules/ApiManager"

const Home = () => {

    const userId = parseInt(sessionStorage.getItem("userId"))

    const [tasks, setTasks] = useState([])
    const [fetchedMessages, setMessages] = useState([])
    const [fetchedEvents, setEvents] = useState([])
    const [fetchedArticles, setArticles] = useState([])

    const taskFetch = () => {
        API.getWithId("tasks", userId)
            .then(taskArray => {
                const taskSortArray = taskArray.sort(function (a, b) {
                    if (a.expectedCompletionDate < b.expectedCompletionDate) {
                        return -1;
                    }
                    if (a.expectedCompletionDate > b.expectedCompletionDate) {
                        return 1;
                    }
                    return 0;
                })
                taskSortArray.sort(function (a, b) {
                    if (a.isComplete === true && b.isComplete === false) {
                        return 1;
                    }
                    if (a.isComplete === false && b.isComplete === true) {
                        return -1;
                    }
                    return 0;
                })
                setTasks(taskSortArray[0])
            })
    }

    const fetchEvents = () => {
        API.getWithId("events", userId)
            .then(eventsArray => {
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

    const fetchMessages = () => {
        API.specialGetWithId("users", userId)
            .then(user => {
                const logoutTime = user.logoutTime
                API.get("messages")
                    .then(messagesArray => {
                        const filteredArray = messagesArray.filter(message => message.time > logoutTime && message.userId !== userId)
                        setMessages(filteredArray)
                    })
            })
    }

    useEffect(() => {
        taskFetch();
        fetchEvents();
        fetchArticles();
        fetchMessages();

    }, []);

    return (
        <>
            <div className="homeContainer">
                {tasks === undefined || tasks.isComplete === true
                    ? <h1>You have no tasks</h1>
                    : <h1>{tasks.task}</h1>}
                {!fetchedEvents
                    ? <h1>No Events</h1>
                    : <h1>{fetchedEvents.name}</h1>}
                {fetchedArticles === undefined
                    ? <h1>No Articles</h1>
                    : <h1>{fetchedArticles.title}</h1>}
                {fetchedMessages === undefined
                    ? <h1>No New Messages</h1>
                    : <h1>You have {fetchedMessages.length} new messages!</h1>}
            </div>
        </>
    )
}

export default Home