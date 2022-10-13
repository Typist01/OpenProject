import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommunityCreationModal from "../Modals/CreateCommunityModal/CreateCommunityModal";

export function Menu(props:any){
    // const [isVisible, setIsVisible] = useState(false);

    // function handleOutsideClick(e:any) {
    //     if (e.target.closest("navbar-menu")) {
    //         console.log("its inside")
    //     } else {
    //         console.log("it's outside")
    //         props.closeMenu()
    //     }
    // }
    // useEffect(()=>{
    //     if (props.menuVisible){
    //         document.addEventListener("click", handleOutsideClick)
    //     }
    // }, [props.menuVisible])
    // useEffect(()=>{
    //     window.addEventListener("click", (e:any)=>{
    //         console.log(e.target)
    //     })
    // },[])

    function clickHandler(e:any){
        if (!e.target.closest(".navbar-menu")){
            props.closeMenu();
        }
    }

    const [showCommunityCreationModal, setShowCommunityCreationModal] = useState(false);
    function closeCommunityModal(){
        setShowCommunityCreationModal(false)

    }
    return(
        <React.Fragment>

            {showCommunityCreationModal && <CommunityCreationModal closeFunction={closeCommunityModal}  />}
    <div className="menu-modal modal-background" style={{display:!props.menuVisible?"none":"block"}} onClick={clickHandler}>
    <div className="navbar-menu" onClick={()=>console.log("menu clicked")}>

        {/* <table className="menu-list">
            <tr>
                <p> hi from one</p>
            </tr>
            <tr>
                <p> hi from two</p>
            </tr>
            <tr>
                <p> hi from two</p>
            </tr>

        </table> */}
        <ul className="menu-list" >
        <Link to="/create-project" onClick={props.closeMenu} >
        <li className="list-item">
            <p>Create a project!</p>

        </li>
        </Link>
        <Link to="#" onClick={() => {
            setShowCommunityCreationModal(true)
            props.closeMenu()
    }}>
        <li className="list-item" >
        <p>Form a community</p>
        </li>
        </Link>


        <li className="list-item">
        <p>Explore</p>
        </li>
        <li>
            another
        </li>
        </ul>
        
    </div>
    </div>
    </React.Fragment>
    )
}