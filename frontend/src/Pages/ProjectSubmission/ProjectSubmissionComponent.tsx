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
                    <h1>Task Title</h1>
                    {/* <input className="prerequisite-title-input" type="text" placeholder="title" /> */}
                    <h2>Task Description</h2>
                    <textarea className="prerequisite-text-area" />
                </div>
                <div className="section">
                    <h2>Requisites</h2>
                    <textarea className="prerequisite-text-area" />
                </div>

                <span className="close" onClick={closeFunction}>&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>
        // wait, I think I changed the design, this was supposed to be for submitting
    )
}

export default PrerequisiteModal;



// 


// const Prerequisite = () => (<h1>Prerequisite 1</h1>);

// const PrerequisiteModal = ({
//     closeFunction,
//     taskInput: task,
// }: {
//     closeFunction: () => void;
//     taskInput: string;
// }) => {

    
//     return (
//         <div
//             id="myModal"
//             className={"modal modal-shown prerequisite-modal"}
//             onClick={() => {
//                 console.log("clicked");
//             }}
//         >
//             <div className="modal-content">
//                 <Prerequisite />
//                 <div className="section">
//                     <h1>Prerequisites for TaskTitle</h1>
//                     {/* <input className="prerequisite-title-input" type="text" placeholder="title" /> */}
//                     <h2>{"Task Description" + { task }} </h2>
//                     <textarea className="prerequisite-text-area" value={task} />
//                 </div>
//                 <div className="section">
//                     <h2>Requisites</h2>
//                     <textarea className="prerequisite-text-area" />
//                 </div>

//                 <span
//                     className="close"
//                     onClick={closeFunction}
//                 >
//                     &times;
//                 </span>
//                 <p>Some text in the Modal..</p>
//             </div>
//         </div>
//     )

// }



// export default PrerequisiteModal;