import React, { useState } from "react";
import CommunityCreationModal from "../Communities/CreateCommunityModal/CreateCommunity";
import "./Home.scss";

const ProjectPreview = () => {
    return (
        <div className="project-preview-container">
            <div className="flex-container relative-container">
                <h1 className="project-preview-title ">Project Name</h1>
                <div className="project-preview-pp"></div>
            </div>
            <p className="project-preview-description">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam fugiat
                distinctio quidem sint provident laborum placeat, adipisci dignissimos
                laudantium! Ipsam atque odio incidunt dolorem officiis minus. Ducimus
                asperiores delectus obcaecati!
            </p>

        </div>
    );
};

const SubmissionPreview = () => {
    return (
        <div className="submission-preview-container">
            <div className="flex-container relative-container">
                <h1 className="project-preview-title">Submission Name</h1>
                <div className="project-preview-pp"></div>
            </div>
            <p className="project-preview-description">
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam fugiat
                distinctio quidem sint provident laborum placeat, adipisci dignissimos
                laudantium! Ipsam atque odio incidunt dolorem officiis minus. Ducimus
                asperiores delectus obcaecati!
            </p>
        </div>
    )
}

const CommunityPreview = () => {
    return (
        <div className="community-preview">
            <div className="flex-container relative-container">
                <h1 className="community-preview-title"> Community Name </h1>
                <div className="community-preview-pp"></div>
            </div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam optio ad dolor iusto fuga velit blanditiis fugiat sint nulla nostrum tempora voluptatum explicabo non, voluptatibus pariatur nam, quas nemo voluptate.</p>
            <p>Member count: </p>
        </div>
    )
}

const RenderMain = (props: any) => {
    if (props.highlight === "projects") {
        return (
            <React.Fragment>
                <ProjectPreview />
                <ProjectPreview />
                <ProjectPreview />
            </React.Fragment>

        )
    } else {
        return (
            <React.Fragment>
                <SubmissionPreview />
                <SubmissionPreview />
                <SubmissionPreview />

            </React.Fragment>
        )
    }
}

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [highlight, setHighlight] = useState("projects");

    return (
        <React.Fragment>

            <div className="home-section">

                <div className="home-left-nav">

                    {showModal ? (
                        <CommunityCreationModal
                            closeFunction={() => {
                                setShowModal(v => !v);
                            }}
                        />
                    ) : null}
                    <div className="">
                        <button
                            className="home-button"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            <h1>Create a new community</h1>
                            <p>Find collaborators and work on something new</p>
                        </button>
                    </div>
                    <div>
                        <button
                            className="home-button"
                        >
                            <h1>Create a new project</h1>
                            <p>Write down tasks and project requirements</p>
                        </button>
                    </div>
                </div>



                <div className="project-previews">
                    <div className="home-nav">
                        <div className={`home-heading ${highlight === "projects" ? "highlight" : null} `}>
                            <strong onClick={() => {
                                setHighlight("projects")
                            }}>Projects</strong>
                        </div>
                        <div className={`home-heading ${highlight === "submissions" ? "highlight" : null} `}>
                            <strong onClick={() => {
                                setHighlight("submissions")
                            }}>Submissions</strong>
                        </div>
                    </div>
                    <RenderMain highlight={highlight} />

                </div>

                <div className="home-right-nav">
                    <h1>Explore Communities</h1>
                    <CommunityPreview />
                    <CommunityPreview />

                    <CommunityPreview />


                </div>


            </div>



        </React.Fragment>
    );
};

export default Home;
