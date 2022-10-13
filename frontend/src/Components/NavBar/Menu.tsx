import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommunityCreationModal from "../Modals/CreateCommunityModal/CreateCommunityModal";

// navbar menu for tablet - mobile devices
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
           
            <ul className="menu-list" >
            <li className="list-item">
            <Link to="/create-project" onClick={props.closeMenu} >
                <p>Create a project!</p>
            </Link>
            </li>

          
            <Link to="#" onClick={() => {
                setShowCommunityCreationModal(true)
                props.closeMenu()
        }}>
            <li className="list-item" >
            <p>Form a community</p>
            </li>
            </Link>

            <Link to="#">
            <li className="list-item">
            <p>Explore</p>
            </li>
            </Link>
            
            </ul>
        </div>
    </div>
    </React.Fragment>
    )
}