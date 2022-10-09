import React, { useEffect, useState } from "react";
import "../../sass/pages/PrerequisiteModal.scss"
import { useAppDispatch } from "../../store/hooks";
import prerequisite from "../../store/Models/prerequisite";
import Task, { taskUpdate } from "../../store/Models/task";
import { updateTask } from "../../store/projectSlice";


const Prerequisite = ({ key, secondKey, storedData, taskBody }: { key: number; secondKey: number; storedData: prerequisite; taskBody: Task }) => {
    const [title, setTitle] = useState("");

    const dispatch = useAppDispatch();


    return (
        <>
            <div className="section" key={key}>
                <input
                    value={title}
                    onChange={(e) => { setTitle(e.currentTarget.value) }}
                    id="title"
                    className="requisite-input"
                    contentEditable="true"
                    placeholder={"Requisite " + (secondKey + 1)}
                    // a lot of stuff is broken 
                    style={{ backgroundColor: "#1e1e1e", color: "white" }}
                />
                {/* <div className="" style={{ display: "flex", justifyContent: "center" }}>
                <h2 className="requisite-label">Requisite</h2>
                <input className="requisite-input" type="text"></input>
            </div> */}
                <textarea
                    value={storedData.body}
                    onChange={(e) => {
                        const content = e.target.value;
                        dispatch(updateTask({ id: taskBody.id, prerequisite: storedData, type: taskUpdate.updatePrerequisite, body: content }))
                    }}
                    className="prerequisite-text-area"
                >{storedData.body}</textarea>
            </div>
        </>
    )
};

const PrerequisiteModal = ({
    closeFunction,
    taskBody
}: {
    closeFunction: () => void;
    taskBody: Task;
}) => {
    // const [prerequisites, setPrerequisites] = useState<Array<string>>(data.find(p => p.id === taskId)?.prerequisites ?? []);
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    // const addPrerequisite = () => setPrerequisites(prevValue => [...prevValue, ""]);
    // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let v: string = "";
    //     e.target.files!.item(0)?.text().then(x => v = x);
    //     setSelectedFile(v);
    // }

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (taskBody.prerequisites.length < 1)
            dispatch(updateTask({ id: taskBody.id, type: taskUpdate.addPrerequisite }))
    }, [])


    return (
        <>
            <div
                id="myModal"
                className={"modal modal-shown  prerequisite-modal"}
                onClick={(e: any) => {
                    if (e.target.closest(".modal-content")) {
                        return
                    }
                    else {
                        closeFunction()
                    }
                }}
            >
                <div className="modal-content">
                    <h1>{taskBody.name}</h1>
                    <h1>Prerequisites</h1>
                    {taskBody.prerequisites.map((_, i) => (
                        <Prerequisite
                            key={i}
                            secondKey={i}
                            storedData={taskBody.prerequisites[i]}
                            taskBody={taskBody}
                        />
                    ))}
                    {/* why don't we use cookies? */}
                    {/* that would help us do this without using useState? idk what's the problem all the time lol */}
                    {/* like why it is throwing errors or what functionality we are tryign to implement. idk */}
                    {/* can you check if the create project api endpoint works? wait */}

                    <div className="pr-buttons">
                        <button
                            onClick={() => {
                                dispatch(updateTask({ id: taskBody.id, type: taskUpdate.addPrerequisite }))
                            }}
                            className="pr-button"
                        >
                            Add More
                        </button>
                        <label className="custom-file-upload" htmlFor="file-upload" >
                            File Upload
                        </label>

                        <input
                            id="file-upload"
                            type="file"
                            onChange={e => {
                                setSelectedFile(e.currentTarget.files![0]);
                                console.log(selectedFile);
                            }}
                            className="pr-button"
                            multiple={false}
                        >
                        </input>
                    </div>

                    <div className="section">
                        <button className="upload-button" onClick={() => console.log("")}>Save</button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ({ closeFunction, taskBody }: { closeFunction: () => void; taskBody: Task; }) => (
    <PrerequisiteModal closeFunction={closeFunction} taskBody={taskBody} />
);