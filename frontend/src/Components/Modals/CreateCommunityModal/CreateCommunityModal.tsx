import React, { useState, useEffect } from "react";
import "./CreateCommunityModal.scss"
import "./checkbox.scss"
import { Theme } from "../../../constants";
import { getTheme } from "../../../utils";
// import { FilterVintageSharp } from "@mui/icons-material"

const CommunityCreationModal = ({ closeFunction }: { closeFunction: () => void }) => {
    const [tags, setTags] = useState<Array<string | null>>([]);
    const [tagText, setTagText] = useState("");

    const clickHandler = (e: any) => {
        if (!e.target.closest(".cc-modal-content"))
            closeFunction();
    }

    useEffect(() => {
        console.log(tags)
    }, [tags]);
    const [projectName, setProjectName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [theme] = useState<Theme>(getTheme());

    function changeHandler(e: React.SyntheticEvent) {
        const target = e.target as HTMLInputElement;
        const name = target.name;
        const val = target.value;
        switch (name) {
            case ("projectName"):
                setProjectName(val);
                break
            case ("description"):
                setDescription(val);
                break;
        }
    }

    function submitHandler(e: React.SyntheticEvent) {
        e.preventDefault();
        const submitBody = {
            projectName,
            tags,
            description
        };
        console.log("form submitted");
        console.log("with submit body: ");
        console.log(submitBody);
        console.log(tags);
    }

    return (
        <>
            <div id="myModal" className={"modal modal-shown cc-modal"} onClick={clickHandler}>
                <div className={`cc-modal-content ${theme}`}>
                    <div className="cc-modal-body">
                        <h1 className="cc-title"> Create a new <b>community</b>! </h1>
                        <form onSubmit={submitHandler}>
                            <input className="cc-title-input" placeholder="Enter a name" value={projectName} onChange={changeHandler} name="projectName" />
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
                                                    <img alt="tag" id={`tag-${i}`} className="tag-cross" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/OS_X-Logo.svg" onClick={_ => { tags[i] = null; setTags(tags.filter(t => t !== null)); }} />
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <textarea className="community-description-text-area" placeholder="Description" value={description} onChange={changeHandler} name="description"></textarea>
                            </div>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>

                </div>
            </div >
        </>
    );
}


export default CommunityCreationModal;