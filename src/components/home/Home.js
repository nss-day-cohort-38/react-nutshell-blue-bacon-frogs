import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const Home = () => {
    const userId = parseInt(sessionStorage.getItem("userId"))
    const [tasks, setTasks] = useState([])
    const [messages, setMessages] = useState([])
    const taskFetch = () => {
        API.getWithId("tasks", userId)
            .then(taskArray => {
        
                    taskArray.sort(function (a, b) {
                        if (a.expectedCompletionDate < b.expectedCompletionDate) {
                            return 1;
                        }
                        if (a.expectedCompletionDate > b.expectedCompletionDate) {
                            return -1;
                        }
                        return 0;
                    })
                    setTasks(taskArray[0])
                
                
        
            })
    }
    
   
    useEffect(() => {
        taskFetch();
      }, []);

    return (
        <>
    {tasks === undefined ? <><h1>No task</h1></> : <><h1>{tasks.task}</h1></> } 
    </>
    )

    
    
}

export default Home