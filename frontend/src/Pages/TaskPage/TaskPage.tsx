import React from "react"
import "../../sass/pages/TaskPage.scss"
import convert from "./numtowords";
// const numbers = [" One", "Two", "Three", "Four", "Five", "Six"];

const Requisite = ({ key, i }: { key: number, i: number }) => {
    // works
    return (
        <div key={key} style={{ marginTop: "30px" }} >
            <h1 className="requisite-title">{convert(i + 1).split('').map((x, i) => i > 0 ? x : x.toUpperCase()).join('')}</h1>
            <div className="requisite-box"></div>
        </div>
    )
}
const FileExplorer = () => {
    return (
        <React.Fragment>
            <div className="submit-section">

                <h1 className="explorer-title">File Explorer</h1>
                <div className="flex-container">
                    <div className="explorer"></div>
                    <button className="task-button">Start Submission</button>

                </div>

            </div>



        </React.Fragment >
    )
}

const TaskPage = () => {
    const taskTitle = "Lorem ipsum dolor sit amet. Id dolor rerum ea internos tempora aut itaque nostrum ut iure aspernatur et "
    return (
        <React.Fragment>
            <div className="requisite-section">
                <h1 className="task-title">{"Task: " + taskTitle}</h1>
                <div className="requisites">
                    <Requisite key={0} i={0} />
                    <Requisite key={1} i={20349} />
                </div>
            </div>
            <FileExplorer />
        </React.Fragment>
    )
}

export default TaskPage;