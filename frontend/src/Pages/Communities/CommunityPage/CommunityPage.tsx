import React from "react";
import { Link } from "react-router-dom";
import "./CommunityPage.scss"
const ProjectPost = (key:any)=> {
    return(
        <Link to="/project">
        <div key={key} className="project-post">
            <div className="flex-container post-header">
            <h1 className="post-title">This is the post title</h1>
            <div className="flex-container collaborators">
                <div className="collaborator-pp"></div>
                <div className="collaborator-pp"></div>
                <div className="collaborator-pp"></div>
            </div>
            </div>
            <div className="description-container">
                <h3 style={{color:"black"}}>Aim:</h3>
            <p className="post-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita molestiae sed architecto, veritatis asperiores quis quaerat corrupti esse similique, necessitatibus cupiditate! Iste ipsum, asperiores laborum non eius ut corrupti suscipit.</p>
            </div>
        </div>
        </Link>
    )
}

const CommunityPage = () => {

    const taskArray = Array.apply(null, Array(5))
    return(
        <React.Fragment>
            <div className="community-flex-container">
                <div className="community-profile">
                    <div className="community-pp"><p>profile</p></div>
                    <div className="community-description"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus inventore delectus asperiores perspiciatis dolorem. Quia perferendis rerum eos debitis deleniti quod? Dolor, dicta! Distinctio cumque vel vero voluptas quas recusandae?</p> </div>
                </div>
                <div className="posts">
                    {taskArray.map((_, i)=>{
                        return(<ProjectPost key={i} />)
                    })}
                    <ProjectPost />
                </div>

            </div>

        </React.Fragment>
    )
}

export default CommunityPage;