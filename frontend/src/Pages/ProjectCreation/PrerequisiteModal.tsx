import React, { useEffect, useState } from "react";
import "./PrerequisiteModal.scss"


const Prerequisite = ({ key, secondKey, storedData, handleChange }: { handleChange: (details: string) => void; key: number; secondKey: number; storedData: string; }) => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    useEffect(() => {
        handleChange(details);
    }, [details]);

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
                    value={details}
                    onChange={(e) => setDetails(e.currentTarget.value)}
                    className="prerequisite-text-area"
                >{storedData}</textarea>
            </div>
        </>
    )
};

const PrerequisiteModal = ({
    closeFunction,
    taskInput: task,
    data,
    setData,
    taskId
}: {
    closeFunction: () => void;
    taskInput: string;
    data: Array<{
        id: number;
        name: string;
        prerequisites: string[];
    }>;
    setData: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
        prerequisites: string[];
    }>>;
    taskId: number;
}) => {
    const [prerequisites, setPrerequisites] = useState<Array<string>>(data.find(p => p.id === taskId)?.prerequisites ?? []);
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const addPrerequisite = () => setPrerequisites(prevValue => [...prevValue, ""]);
    // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     let v: string = "";
    //     e.target.files!.item(0)?.text().then(x => v = x);
    //     setSelectedFile(v);
    // }

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
                    <h1>{task}</h1>
                    <h1>Prerequisites</h1>
                    {prerequisites.map((_, i) => (
                        <Prerequisite
                            key={i}
                            secondKey={i}
                            storedData={data[taskId].prerequisites[i]}
                            handleChange={(newItem: string) => setData(v => ({ ...v, prerequisites: [...v.prerequisites, newItem] }))}
                        />
                    ))}
                    {/* why don't we use cookies? */}
                    {/* that would help us do this without using useState? idk what's the problem all the time lol */}
                    {/* like why it is throwing errors or what functionality we are tryign to implement. idk */}
                    {/* can you check if the create project api endpoint works? wait */}
                    
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
                        <button className="upload-button" onClick={() => console.log("")}>Save</button>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ({ closeFunction, taskInput, data, setData, taskId }: {
    closeFunction: () => void; taskInput: string; data: {
        id: number;
        name: string;
        prerequisites: string[];
    }[]; setData: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
        prerequisites: string[];
    }>>;
    taskId: number;
}) => (
    <PrerequisiteModal taskId={taskId} closeFunction={closeFunction} taskInput={taskInput} data={data} setData={setData} />
);