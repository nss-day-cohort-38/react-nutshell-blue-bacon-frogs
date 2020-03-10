import React, {useState} from "react"
import API from "../../modules/ApiManager"

const TaskForm = (props) => {
    const [tasks, setTasks] = useState({userId: parseInt(sessionStorage.getItem("userId")), task: "", expectedCompletionDate: "", isComplete: false})
    const [isLoading, setIsLoading] = useState(false)

    const handleFieldChange = (e) => {
        const stateToChange = {...tasks} //stateToChange has all default props of tasks
        stateToChange[e.target.id] = e.target.value
        setTasks(stateToChange)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(tasks.task === "" || tasks.expectedCompletionDate === "") {
            window.alert("Please input task information")
        } else {
            setIsLoading(true)
            API.save(tasks, "tasks")
            .then(() => props.history.push("/tasks"))
        }
    }
    return (
        <form>
            <fieldset>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="task"
              placeholder="Task name"
            />
            </fieldset>
            <fieldset>
            <label htmlFor="expectedCompletionDate">Expected Completion Date</label>
            <input
              type="date"
              required
              onChange={handleFieldChange}
              id="expectedCompletionDate"
              placeholder="Expected Completion Date"
            />
            </fieldset>
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
            >Submit</button>
        </form>
    )
}

export default TaskForm