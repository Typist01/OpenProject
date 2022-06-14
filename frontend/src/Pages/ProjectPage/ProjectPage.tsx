import React from "react"
import "./ProjectPage.scss"

const ProjectPage = () => {
    const lorem = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste repellat rem, quas vitae, nihil dignissimos quidem culpa possimus eum cupiditate alias voluptate, et temporibus! Quia similique impedit quas doloremque totam."
    const TaskBox = ({ key }: { key: number }) => {
        return (
            <div className="task-box" key={key}>
                <h1> {"Task"} </h1>
                <p className="task-description">Lorem ipsum dolor sit amet. Id dolor rerum ea internos tempora aut itaque nostrum ut iure aspernatur et fugit consectetur aspernatur.
                </p>
                <div className="button-container">
                    <button className=" start-button ">Show Details</button>
                </div>
            </div>
        )
    }

    const MessageBox = ({ key, user, message }: { key: number, user: string, message: string }) => {
        return (
            <div className="message-container" key={key}>
                <div className="flex-container">
                    <div className="user">
                        <div className="user-profile-picture"></div>
                        <p className="username">{user}</p>
                    </div>
                    <div className="user-message">
                        <p className="">{message}</p>
                        <div className="message-options">
                            <span className="reply-opti"><strong>reply</strong></span>
                        </div>
                    </div>

                </div>



            </div>
        )
    }

    return (
        <React.Fragment>
            <h1 className="title">Project Name</h1>
            <h2 className="aim-title">Aim</h2>
            <div className="section">
                <div className="aim-box"></div>

                <div className="tasks-container">
                    <TaskBox key={0} />
                    <TaskBox key={1} />

                </div>

            </div>
            <div className="chat-container">
                <h1>Discussion</h1>
                <MessageBox key={0} user="username" message={lorem} />
                <MessageBox key={1} user="username" message={lorem} />


            </div>

        </React.Fragment >

    )
}


export default ProjectPage