import React, { } from "react";
import "./CreateCommunity.scss"
import "./checkbox.scss"



// salam
const CommunityCreationModal = ({ closeFunction }: { closeFunction: () => void }) => {

    // const [userQuery, setUserQuery] = useState({
    //     title: "",
    //     tags: "",
    //     communityProject: true
    // })

    // save project type in usestate
    // const [projectType, setProjectType] = useState("community");

    // handle checkbox toggler
    // function handleCheckBox() {
    //     projectType == "private" ? setProjectType("community") : setProjectType("private")
    // }

    // toggle modal close on outside click
    function clickHandler(e: any) {
        if (e.target.closest(".cc-modal-content")) {
        } else {
            closeFunction()
        }
    }

    return (
        <React.Fragment>
            <div id="myModal" className={"modal modal-shown cc-modal"} onClick={clickHandler}>
                <div className="cc-modal-content">
                    <div className="cc-modal-body">
                        <h1 className="cc-title"> Create a New Community </h1>
                        <input className="cc-title-input" placeholder="Enter a Name" />
                        <input className="cc-title-input" placeholder="Enter categories / Tag relevant communities" />
                        {/* testing a toggle check box, not needed here but can be used in elsewhere */}
                        {/* <div className="flex-container checkbox-container">
                            <input type="checkbox" id="check" className="toggle" checked={projectType == "community" ? false : true} onClick={handleCheckBox}></input>
                            <label htmlFor="check"></label>
                            <span>{projectType}</span>
                        </div> */}
                        <div>
                            <textarea className="community-description-text-area" placeholder="Description"></textarea>

                        </div>
                        <br></br>
                        <button>Submit</button>

                    </div>

                </div>
            </div >
        </React.Fragment >
    );
}


export default CommunityCreationModal;