import React, {useState, useEffect} from "react"
import API from "../../modules/ApiManager"

const TaskEditForm = (props) => {
    const [tasks, setTasks] = useState({userId: props.activeUser, task: "", expectedCompletionDate: "", isComplete: false})
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
            <input
              type="text"
              required
              onChange={handleFieldChange}
              id="task"
              value={tasks.task}
            />
                <label htmlFor="task">Task</label>
            </fieldset>
            <fieldset>
            <input
              type="date"
              required
              onChange={handleFieldChange}
              id="expectedCompletionDate"
              value={tasks.expectedCompletionDate}
            />
            <label htmlFor="expectedCompletionDate">Expected Completion Date</label>
            </fieldset>
            <button
              type="button"
              disabled={isLoading}
              onClick={updateTask}
            >Submit</button>
        </form>
    )
}

export default TaskEditForm
