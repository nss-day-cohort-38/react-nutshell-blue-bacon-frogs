import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const TaskCard = (props) => {
    const [isComplete, setIsComplete] = useState() 
    const [textColor, setTextColor] = useState()
    const [backgroundColor, setBackgroundColor] = useState()

    const toggleCheck = () => {
        setIsComplete(!isComplete) //changing the state in the card
        const changeObj = {...props.task} //changing state in the database
        changeObj.isComplete = !isComplete //does the opposite of what is in the database when checked
       API.update(changeObj, "tasks").then(() => {
            props.getTasks()
       })
    }
    useEffect(() => {
        if(!props.task.isComplete) {
            setTextColor({textDecoration: 'none'})
            setBackgroundColor({backgroundColor: 'white'})
        } else {
            setTextColor({textDecoration: 'line-through'})
            setBackgroundColor({backgroundColor: '#4A5C9B'})
        }
    }, [props.task])

    useEffect(() => {
        setIsComplete(props.task.isComplete) //sets the value of is complete in the card to the value from the database on
    }, [])

       return (
        <>
        <div className="card-content" style={backgroundColor}>
        <input type="checkbox"className="taskCheck" id="taskCheck" checked={props.task.isComplete} onChange={toggleCheck} />
        <p style={textColor} className="taskName"> {props.task.task}</p>
        <p className="date">{props.task.expectedCompletionDate}</p>
        <div className="crudButtons">
        <button className="editButton" type="button" onClick={() => props.history.push(`/tasks/${props.task.id}/edit`)}>Edit</button>
        <button type="button" onClick={() => props.delete(props.task.id)}>Delete</button>
        </div>
        </div>
        </>
    
    )
}

export default TaskCard
