import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const TaskEditForm = (props) => {
    const [tasks, setTasks] = useState({userId: "", task: "", expectedCompletionDate: "", isComplete: false})
    const [isLoading, setIsLoading] = useState(false)

    const handleFieldChange = (e) => {
        const stateToChange = {...tasks} //stateToChange has all default props of tasks
        stateToChange[e.target.id] = e.target.value
        setTasks(stateToChange)
    }

    const updateTask = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const editedTask = {
            id: props.match.params.taskId,
            userId: tasks.userId,
            task: tasks.task, 
            expectedCompletionDate: tasks.expectedCompletionDate, 
            isComplete: tasks.isComplete
        }
        API.update(editedTask, "tasks")
        .then(() => {
            props.history.push("/tasks")
        })
    }

    useEffect(() => {
        API.edit(props.match.params.taskId, "tasks").then((task) => {
            setTasks(task)
            setIsLoading(false)
        })
    }, [props.match.params.taskId])

    return (
        <form>
            <fieldset>
            <div className="formContent">
            <label htmlFor="task">Task: </label> <span></span>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="task"
              value={tasks.task}
            />
            </div>
            
            <div className="formContent">
            <label htmlFor="expectedCompletionDate">Expected Completion Date: </label> <span></span>
            <input
              type="date"
              required
              onChange={handleFieldChange}
              id="expectedCompletionDate"
              value={tasks.expectedCompletionDate}
            />
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={updateTask}
            >Submit</button>
            </fieldset>
        </form>
    )
}

export default TaskEditForm
