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
    // const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);

    const addPrerequisite = () => setPrerequisites(prevValue => [...prevValue, ""]);
    // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let v: string = "";
    //     e.target.files!.item(0)?.text().then(x => v = x);
    //     setSelectedFile(v);
    // }

    return (
        <div
            id="myModal"
            className={"modal modal-shown  prerequisite-modal"}
            onClick={() => {
                console.log("clicked");
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
                    <button
                        // type="text"
                        // value={selectedFile}
                        // onChange={handleOnChange}
                        className="pr-button"
                    >
                        Attach File
                    </button>
                </div>

                <div className="section">
                    <button className="upload-button"> Upload</button>
                </div>
                <span
                    className="close"
                    onClick={closeFunction}
                >
                    &times;
                </span>
            </div>
        </div>
    );

}



export default PrerequisiteModal;