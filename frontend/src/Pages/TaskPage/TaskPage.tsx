import React from "react"
import "./TaskPage.scss"

const Requisite = () => {
    return (
        <div>
            <h1>Hi</h1>
            <div className="requisite"></div>
        </div>
    )
}

const TaskPage = () => {
    const taskTitle = "Lorem ipsum dolor sit amet. Id dolor rerum ea internos tempora aut itaque nostrum ut iure aspernatur et "

    return (
        <div className="section">
            <h1 className="task-title">{"Task: " + taskTitle}</h1>
            <div className="requisites">
                <Requisite />

            </div>
        </div>
    )
}

export default TaskPage;