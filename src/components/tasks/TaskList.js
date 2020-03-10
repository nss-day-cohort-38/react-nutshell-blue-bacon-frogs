import React, {useState, useEffect} from "react"
import TaskCard from "./TaskCard"
import API from "../../modules/ApiManager"

const TaskList = (props) => {
    const [tasks, setTasks] = useState([])
    
    const getTasks = () => {
        API.get("tasks").then(tasksFromAPI => {
            console.log(tasksFromAPI)
            setTasks(tasksFromAPI)
        })
    }

    const deleteTasks = (id) => {
        API.delete(id, "tasks")
        .then(() => {
            API.get("tasks").then(setTasks)
        })
    }

    

    useEffect(() => {
        getTasks(); 
    }, [])


    return (
        <>
       <button type="button"
                    onClick={() => {props.history.push("/tasks/new")}}>
                    Add Task
                </button>
        <div className="container-card">
            {tasks.map(task => <TaskCard key={task.id} task={task} expectedCompletionDate={task.expectedCompletionDate} delete={deleteTasks} getTasks={getTasks} {...props}/>)}
        </div>
        </>
    )
}

export default TaskList