import React, { useState } from "react";
import "./PrerequisiteModal.scss"


const Prerequisite = ({ key, secondKey }: { key: number, secondKey: number }) => (
    <React.Fragment>
        <div className="section" key={key}>
            <input
                id="title"
                className="requisite-input"
                contentEditable="true"
                placeholder={"Requisite " + (secondKey + 1)}
                style={{ backgroundColor: "#1e1e1e", color: "white" }}
            />
            {/* <div className="" style={{ display: "flex", justifyContent: "center" }}>
                <h2 className="requisite-label">Requisite</h2>
                <input className="requisite-input" type="text"></input>
            </div> */}

            <textarea className="prerequisite-text-area" />
        </div>
    </React.Fragment >

);
// salam
const PrerequisiteModal = ({
    closeFunction,
    taskInput: task,
}: {
    closeFunction: () => void;
    taskInput: string;
}) => {
    const [prerequisites, setPrerequisites] = useState([""]);
    const [selectedFile, setSelectedFile] = useState<File | null>(
        null
    );

    const addPrerequisite = () => setPrerequisites(prevValue => [...prevValue, ""]);
    // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let v: string = "";
    //     e.target.files!.item(0)?.text().then(x => v = x);
    //     setSelectedFile(v);
    // }

    return (
        <React.Fragment>
            <div
                id="myModal"
                className={"modal modal-shown  prerequisite-modal"}
                onClick={(e: any) => {
                    if (e.target.closest(".modal-content")) {
                        console.log("you clicked inside")
                        return
                    }
                    else {
                        console.log("you clicked outside")
                        closeFunction()
                    }
                }}
            >
                <div className="modal-content">
                    <h1>{task}</h1>
                    <h1>Prerequisites</h1>
                    {prerequisites.map((_, i) => (
                        <Prerequisite
                            key={i}
                            secondKey={i}
                        />
                    ))}

                    <div className="pr-buttons">
                        <button
                            onClick={addPrerequisite}
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


                        <button className="upload-button">Save</button>


                    </div>

                </div>
            </div >
        </React.Fragment >

    );

}


const Modal = ({ closeFunction, taskInput }: { closeFunction: () => void; taskInput: string; }) => (

    <PrerequisiteModal closeFunction={closeFunction} taskInput={taskInput} />
)
export default Modal;