import React, {useState} from "react"

const TaskCard = (props) => {
    
    return (
        <>
        <div className="card-content">
        <input type="checkbox" id="taskCheck" onChange={() => console.log("hello")}/>
        <h4 className="taskName">Task Name {props.task.task}</h4>
        <h4 className="date">Expected Completion Date {props.task.expectedCompletionDate}</h4>
        <button type="button" onClick={() => props.delete(props.task.id)}>Delete</button>
        <button type="button" onClick={() => props.history.push(`/tasks/${props.task.id}/edit`)}>Edit</button>
        </div>
        </>
    
    )
}

export default TaskCard
