import React, { useState, useEffect } from "react";
import "./ProjectCreation.scss";
import Modal from "./PrerequisiteModal";

export const Task = ({ key, secondKey }: { key: number, secondKey: number }) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [prerequisiteVisible, setPrequisiteVisibility] = useState<boolean>(false);

  function handleTaskInput(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute("name");
    setTaskInput(value);
    console.log(value, name);
  }
  const handlePrerequisiteClick = () => setPrequisiteVisibility(v => !v);

  return (
    <React.Fragment>
      {prerequisiteVisible ? <Modal closeFunction={handlePrerequisiteClick} taskInput={taskInput} /> : null}
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
  const [taskArray, setTaskArray] = useState<Array<string>>([""]);
  useEffect(() => {
    console.log(taskArray);
  });

  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const handleTitleClick = (e: React.FormEvent<HTMLInputElement>) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);

  return (
    <React.Fragment>
      <div className=" form">
        <div className="header">
          <div>
            <input
              id="title"
              contentEditable="true"
              onClick={handleTitleClick}
              onInput={handleTitleChange}
              value={title}
              placeholder="Untitled Project"
            />
          </div>
        </div>

        <div className="aim-section">
          <h1 className="aim-heading">Project Aim</h1>
          <textarea id="aim-input" />
        </div>

        <div className="tasks-container">
          <br></br>
          <br></br>

          {taskArray.map((_, i) => (
            <Task
              key={i}
              secondKey={i}
            />
          ))}
        </div>
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
    </React.Fragment>
  );
};
export default ProjectCreation;
