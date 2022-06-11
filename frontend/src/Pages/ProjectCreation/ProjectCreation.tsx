import React, {useState, useEffect} from "react"
import "./ProjectCreation.scss"

export const Task = ({ key }: { key: number; }) =>{
    // const [taskInput, setTaskInput] = useState("")

    // function handleTaskInput(e: React.SyntheticEvent<EventTarget>) {
    //     // const val = e.target.value();



    // }

    return(

            <div key={key} className="task-container">
            <label key={key} className="task">
              Task
            </label>
            <input key={key} className="task-input" type="text" />
          </div>

    )

} 


    const ProjectCreation = () => {
        const [taskArray, setTaskArray] = useState([""]);
        useEffect(() => {
          console.log(taskArray);
        });
      
        return (
            <React.Fragment>
              <div className=" form">
                <div className="header">
                  <label className="label">Project Name</label>
                  <input className="input" type="text" />
                </div>
                <div className="container">
                  <div>
                    {taskArray.map((_, i) => (
                      <Task key={i} />
                    ))}
                  </div>
                </div>
        
                <button
                  className="button"
                  onClick={() => setTaskArray([...taskArray, ""])}
                >
                  Add New Task
                </button>
                <button className="button">Save</button>
              </div>
            </React.Fragment>
          );
        };
        export default ProjectCreation;
        