import React from "react";
import "./PrerequisiteModal.scss"

const PrerequisiteModal = ({ closeFunction }: { closeFunction: () => void; }) => {
    // const [hidden, setHidden] = useState<boolean>(true);
    // const toggleModal = () => {
    //     setHidden(isHidden => !isHidden);
    //     console.log(hidden ? "Modal closed." : "Modal showing.");
    // };
    // modal ${hidden ? "": "modal-shown"}
    return (
        <div id="myModal" className={"modal modal-shown prerequisite-modal"} onClick={() => { console.log("clicked") }}  >
            <div className="modal-content">
                <div className="section">
                    <h1 style={{ color: "black" }}>Prerequisites</h1>
                    <label className="requisite">My Label</label>
                    <input className="task-input" type="text" />
                    <textarea id="aim-box" />
                </div>
                <span className="close" onClick={closeFunction}>&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
    )
}

export default PrerequisiteModal;