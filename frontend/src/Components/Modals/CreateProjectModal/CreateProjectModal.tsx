import React, { useState, useEffect } from "react";
import "./CreateProjectModal.scss"
import "./checkbox.scss"
// import { FilterVintageSharp } from "@mui/icons-material"

const ProjectCreationModal = ({ closeFunction }: { closeFunction: () => void }) => {
    const [tags, setTags] = useState<Array<string | null>>([]);
    const [tagText, setTagText] = useState("");

    function clickHandler(e: any) {
        if (e.target.closest(".cc-modal-content")) {
        } else {
            closeFunction()
        }
    }
    useEffect(() => {
        console.log(tags)
    }, [tags]);

    return (
        <>
            <div id="myModal" className={"modal modal-shown cc-modal"} onClick={clickHandler}>
                <div className="cc-modal-content">
                    <div className="cc-modal-body">
                        <h1 className="cc-title"> Create a new project! </h1>
                        <input className="cc-title-input" placeholder="Enter a name" />
                        <div className="input-wrapper">
                            <input className="cc-title-input tag-input" placeholder="Enter categories/tags"
                                onChange={e => setTagText(e.currentTarget.value)}
                                value={tagText}
                                onKeyDown={e => {
                                    if (e.key === "Tab" || e.key === "Enter") {
                                        console.log(`${e.key} pressed`);
                                        e.preventDefault();
                                        if (tags.includes(tagText) || tagText.trim() === "")
                                            return;

                                        setTags(ts => [...ts, tagText.trim()]);
                                        setTagText("");
                                    }
                                }} />
                            <div className="tags">
                                {
                                    tags.length === 0 ? null : tags.map((t, i) => (
                                        <>
                                            <div className="tag">
                                                <code className="tag-text">{t}</code>
                                                <img id={`tag-${i}`} className="tag-cross" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/OS_X-Logo.svg" onClick={_ => { tags[i] = null; setTags(tags.filter(t => t !== null)); }} />
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <textarea className="community-description-text-area" placeholder="Description"></textarea>
                        </div>
                        <br />
                        <button>Submit</button>

                    </div>

                </div>
            </div >
        </>
    );
}


export default ProjectCreationModal;