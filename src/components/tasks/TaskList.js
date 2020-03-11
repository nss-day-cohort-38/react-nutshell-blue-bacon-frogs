import React, {useState, useEffect} from "react"
import TaskCard from "./TaskCard"
import API from "../../modules/ApiManager"

const TaskList = (props) => {
    const [tasks, setTasks] = useState([])
    const userId = parseInt(sessionStorage.getItem("userId"))
    
    const getTasks = () => {
        API.getWithId("tasks", userId).then(tasksFromAPI => {
            setTasks(tasksFromAPI)
        })
    }

    const deleteTasks = (id) => {
        API.delete(id, "tasks")
        .then(() => {
            API.getWithId("tasks", userId).then(setTasks)
        })
    }

    

    useEffect(() => {
        getTasks(); 
    }, [])


    return (
        <>
        <div className="addSectionContainer">
       <button className="addSection" type="button"
                    onClick={() => {props.history.push("/tasks/new")}}>
                    Add Task
                </button>
        </div>
        <div className="container-card" style={{overflow: 'auto', height: '400px'}}>
            {tasks.map(task => <TaskCard key={task.id} task={task} expectedCompletionDate={task.expectedCompletionDate} delete={deleteTasks} getTasks={getTasks} {...props}/>)}
        </div>
        </>
    )
}

export default TaskList