import React, { useState, useEffect } from "react";
import "../../sass/pages/ProjectCreation.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addTask, updateTask } from "../../store/projectSlice";
import Task, { taskUpdate } from "../../store/Models/task";
// import Modal from "./PrerequisiteModal";

export const TaskBox = ({ key, secondKey, taskBody, updateName }: { key: number, secondKey: number, taskBody: Task, updateName: (a: string, b: string) => void }) => {

  // const [taskData, setTaskData] = useState<{ id: number, name: string, prerequisites: Array<string> }[]>({ id: key, name: "", prerequisites: [""] });
  // const [prerequisiteVisible, setPrequisiteVisibility] = useState<boolean>(false);

  function handleTaskInput(e: React.FormEvent<HTMLInputElement>) {
    const { value } = e.currentTarget;
    // const name = e.currentTarget.getAttribute("name");
    updateName(taskBody.id, value);
  }

  // const handleDataUpdate = () => {
  //   setTaskData()

  // }

  // const [currentTaskId, setCurrentTaskId] = useState(0);

  // const handlePrerequisiteClick = () => {
  //   // setCurrentTaskId(secondKey);
  //   // where should we declare this stateful variable. idk
  //   // setPrequisiteVisibility(v => !v);
  // }

  return (
    <>
      {/* {prerequisiteVisible ? <Modal closeFunction={handlePrerequisiteClick} taskId={currentTaskId} data={taskData} setData={setTaskData} /> : null} */}
      <div key={key} className="task-container">
        <label key={key} className="task">
          {"Task " + (secondKey + 1)}
        </label>
        <input key={key} className="task-input" type="text" value={taskBody.name} name={secondKey.toString()} onChange={handleTaskInput} />
        <div className="icon">
          {/* <button className="prerequisite-button" onClick={handlePrerequisiteClick}>Prerequisites</button> */}
          <button className="prerequisite-button" onClick={() => console.log("prerequisite button clicked")}>Prerequisites</button>
        </div>
      </div>
    </>
  );
}

const ProjectCreation = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(state => state.project)
  // const [taskArray, setTaskArray] = useState<Array<string>>([""]);
  // const [tasks, setTasks] = useState<Array<{ id: number; name: string; prerequisites: Array<{}>; }>>([{
  //   id: 1,
  //   name: "",
  //   prerequisites: []
  // }]);

  useEffect(() => {
    console.log(project.tasks)
    handleAddTask();
  }, []);


  const [title, setTitle] = useState<string>("");
  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
  const handleTitleClick = (e: React.FormEvent<HTMLInputElement>) => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length);
  function handleAddTask() {
    dispatch(addTask({ user: "myUser" }))
  }

  // @ts-ignore
  function handleTaskUpdateName(id: string, name: string) {
    dispatch(updateTask({ id, name, type: taskUpdate.name }))
  }



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
          {project.tasks.map((task, i) => (
            <TaskBox
              key={i}
              secondKey={i}
              taskBody={task}
              updateName={handleTaskUpdateName}
            />
            // imma go eat ok
          ))}
        </div>
        <div className="buttons flex-container">
          <button
            className="button"
            onClick={handleAddTask}
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
