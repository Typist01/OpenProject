import React, { useState, useEffect } from "react";
import "./ProjectCreation.scss";
import PrerequisiteModal from "./PrerequisiteModal";

export const Task = ({ key, secondKey }: { key: number, secondKey: number }) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [prerequisiteVisible, setPrequisiteVisibility] = useState<boolean>(false);

  function handleTaskInput(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute("name");
    setTaskInput(value);
    console.log(value, name);
  }
  const handlePrerequisiteClick = () => {
    setPrequisiteVisibility(v => !v);
  }

  return (
    <React.Fragment>
      {prerequisiteVisible ? <PrerequisiteModal closeFunction={handlePrerequisiteClick} /> : null}
      <div key={key} className="task-container">
        <label key={key} className="task">
          {"Task " + (secondKey + 1)}
        </label>
        <input key={key} className="task-input" type="text" value={taskInput} name={secondKey.toString()} onChange={handleTaskInput} />
        <div className="icon">
          <button className="prerequisite-button" onClick={handlePrerequisiteClick}>Prerequisites</button>
        </div>
      </div>
    </React.Fragment>
  );
}
const ProjectCreation = () => {
  const [taskArray, setTaskArray] = useState<Array<string>>([]);
  useEffect(() => {
    console.log(taskArray);
  });

  const [title, setTitle] = useState("Untitled Project");
  // const [titleExists, setTitleExists] = useState<boolean>(false);

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    setTitle(val);
    console.log(val, title);
    // setTitleExists(t => title.length === 0 && !t ? true : false);
  }

  const handleTitleClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
  }

  // {
  //   titleExists ? "Project Title" : title
  // }

  return (
    <React.Fragment>
      <div className=" form">
        <div className="header">
          <div>
            <input id="title" value={title} contentEditable="true" onClick={handleTitleClick} onInput={ handleTitleChange } />
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
