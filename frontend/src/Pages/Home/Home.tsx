import React, { useState } from "react"
import CommunityCreationModal from "../Communities/CreateCommunity/CreateCommunity"
import "./Home.scss"


const Home = () => {
    const [showModal, setShowModal] = useState(false)


    return (
        <React.Fragment>
            {showModal ? <CommunityCreationModal closeFunction={() => { setShowModal(v => !v) }} /> : null}
            <div className="home-container">
                {/* buttons here just to test the api */}
                <button className="home-button" onClick={() => { setShowModal(true) }}>Create New Community</button>
                {/* <button>Create New Contest</button>
            <button>Create New Project</button> */}
            </div>
        </React.Fragment>
    )
}

export default Home;