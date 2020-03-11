import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import API from "../../modules/ApiManager"

const Home = (props) => {

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

    const fetchUsers = () => {
        return API.specialGetWithId("users", userId).then(user => user.username)
    }
   

    useEffect(() => {
        taskFetch();
        fetchEvents();
        fetchArticles();
        fetchMessages();
        fetchUsers();

    }, []);

    return (
        <>
            <div className="homeContainer">
                <h1>Welcome to Nutshell!</h1>
                <Link className="nav-link" style={{ textDecoration: 'none',  color: 'black' }} to="/tasks">
                
                <div className="taskContainer">
                <h2 className="homeHeaders">Upcoming tasks</h2>
                {tasks === undefined || tasks.isComplete === true
                    ? <h3>No upcoming tasks to complete</h3>
                    : <h3>{tasks.task}</h3>}
                </div>
                </Link>
                <Link className="nav-link" style={{ textDecoration: 'none',  color: 'black' }} to="/events">
                <div className="eventContainer">
                    <h2 className="homeHeaders">Upcoming events</h2>
                {!fetchedEvents
                    ? <h3>No upcoming events to attend</h3>
                    : <h3>{fetchedEvents.name}</h3>}
                </div>
                </Link>
                <Link className="nav-link" style={{ textDecoration: 'none',  color: 'black' }} to="/articles">
                <div className="articleContainer">
                <h2 className="homeHeaders">Articles</h2>
                {fetchedArticles === undefined
                    ? <h3>No Articles available</h3>
                    : <h3>{fetchedArticles.title}</h3>}
                </div>
                </Link>
                <Link className="nav-link" style={{ textDecoration: 'none',  color: 'black' }} to="/messages">
                <div className="messageContainer">
                <h2 className="homeHeaders">Messages</h2>
                {fetchedMessages === undefined
                    ? <h3>No New Messages</h3>
                    : <h3>You have {fetchedMessages.length} new messages!</h3>}
                </div>
                </Link>
            </div>
        </>
    )
}

export default Home