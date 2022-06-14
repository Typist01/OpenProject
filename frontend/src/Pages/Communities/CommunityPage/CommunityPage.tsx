import React from "react";
import "./CommunityPage.scss"
const ProjectPost = ()=> {
    return(
        <div className="project-post">
            <div className="flex-container">
            <h1 className="post-title">This is the post title</h1>
            <div className="flex-container collaborators">
                <div className="collaborator-pp"></div>
                <div className="collaborator-pp"></div>
                <div className="collaborator-pp"></div>
            </div>
            </div>
            <p className="post-description"></p>
        </div>
    )
}

const CommunityPage = () => {
    
    return(
        <React.Fragment>
            <div className="flex-container">
            <div className="community-profile">
                <div className="community-pp"><p>profile</p></div>
                <div className="community-description"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus inventore delectus asperiores perspiciatis dolorem. Quia perferendis rerum eos debitis deleniti quod? Dolor, dicta! Distinctio cumque vel vero voluptas quas recusandae?</p> </div>
            </div>
            <div className="posts">
                <ProjectPost />
            </div>

            </div>

        </React.Fragment>
    )
}

export default CommunityPage;