import React from "react"
import "./ProjectPage.scss"

const ProjectPage = () => {
    const TaskBox = () => {
        return (
            <div className="task-box">
                <h1>Task</h1>
                <p className="task-description">Lorem ipsum dolor sit amet. Id dolor rerum ea internos tempora aut itaque nostrum ut iure aspernatur et fugit consectetur aspernatur.
                </p>
                <div>
                    <button className="start-button">Button</button>
                </div>
            </div>

        )
    }

    return (
        <React.Fragment>
            <h1 className="title">Project Name</h1>
            <h2 className="aim-title">Aim</h2>
            <div className="section">
                <textarea id="aim-box" />
                <TaskBox />
            </div>
        </React.Fragment>

    )
}


export default ProjectPage