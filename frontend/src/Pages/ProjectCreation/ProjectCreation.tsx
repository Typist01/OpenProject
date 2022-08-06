import React, { useState, useEffect } from "react";
import "./ProjectCreation.scss";
import Modal from "./PrerequisiteModal";

export const Task = ({ key, secondKey }: { key: number, secondKey: number }) => {
  const [taskInput, setTaskInput] = useState<string>("");
  const [taskData, setTaskData] = useState<{ id: number, name: string, prerequisites: Array<string> }[]>({ id: key, name: "", prerequisites: [""] });
  const [prerequisiteVisible, setPrequisiteVisibility] = useState<boolean>(false);

  function handleTaskInput(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    const name = e.currentTarget.getAttribute("name");
    setTaskInput(value);
    console.log(value, name);
  }

  // const handleDataUpdate = () => {
  //   setTaskData()

  // }

  const [currentTaskId, setCurrentTaskId] = useState(0);


  const handlePrerequisiteClick = () => {
    setCurrentTaskId(secondKey);
    // where should we declare this stateful variable. idk
    setPrequisiteVisibility(v => !v);
  }

  return (
    <>
      {prerequisiteVisible ? <Modal closeFunction={handlePrerequisiteClick} taskId={currentTaskId} data={taskData} setData={setTaskData} /> : null}
      <div key={key} className="task-container">
        <label key={key} className="task">
          {"Task " + (secondKey + 1)}
        </label>
        <input key={key} className="task-input" type="text" value={taskInput} name={secondKey.toString()} onChange={handleTaskInput} />
        <div className="icon">
          <button className="prerequisite-button" onClick={handlePrerequisiteClick}>Prerequisites</button>
        </div>
      </div>
    </>
  );
}

const ProjectCreation = () => {
  const [taskArray, setTaskArray] = useState<Array<string>>([""]);
  const [tasks, setTasks] = useState<Array<{ id: number; name: string; prerequisites: Array<{}>; }>>([{
    id: 1,
    name: "",
    prerequisites: []
  }]);

  useEffect(() => {
    console.log(taskArray);
  }, [taskArray]);

  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const handleTitleClick = (e: React.FormEvent<HTMLInputElement>) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
  return (
    <>
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
          <br />
          <br />
          {taskArray.map((_, i) => (
            <Task
              key={i}
              secondKey={i}
              prerequisites
            />
            // imma go eat ok
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
    </>
  );
};
export default ProjectCreation;
