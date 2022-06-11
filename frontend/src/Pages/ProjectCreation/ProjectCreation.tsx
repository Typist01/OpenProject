import React, {useState, useEffect} from "react"
import "./ProjectCreation.scss"
// import FolderCopyIcon from '@mui/icons-material/FolderCopy';

export const Task = ({ key, secondKey }: { key: number, secondKey:number }) => {
    const [taskInput, setTaskInput] = useState("")

    function handleTaskInput(e: React.FormEvent<HTMLInputElement>) {
        const val = e.currentTarget.value;
        const name = e.currentTarget.getAttribute("name");
        setTaskInput(val);
        console.log(val, name)
    }

    return (
        <div key={key} className="task-container">
            <label key={key} className="task">
                Task {secondKey + 1}
            </label>
            <input key={key} className="task-input" type="text" value={taskInput} name={secondKey.toString()} onChange={handleTaskInput} />
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
                <div>
                <span id="title" contentEditable="true">Untitled Project</span>
            </div>
                  {/* <label className="label">Project Name</label>
                  <input className="input" type="text" /> */}
                </div>
                <div className="tasks-container">
                    {taskArray.map((_, i) => (
                      <Task key={i} secondKey={i} />
                    ))}
                </div>
                <div flex-container>
                <div className="buttons flex-container">
                <button
                  className="button"
                  onClick={() => setTaskArray([...taskArray, ""])}
                >
                  Add New Task
                </button>
                <button className="button">Save</button>

                </div>

                </div>


              </div>
            </React.Fragment>
          );
        };
        export default ProjectCreation;
        