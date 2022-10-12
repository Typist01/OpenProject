import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss"

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
    useEffect(()=>{
        window.addEventListener("click", (e:any)=>{
            console.log(e.target)
        })
    },[])
    return(
        // <div className="modal-background">
    <div className="navbar-menu" style={{display:!props.menuVisible?"none":""}}   >

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
            Create a project!
        </li>
        </Link>

        <li className="list-item">
        Form a community
        </li>

        <li className="list-item">
        Explore
        </li>
        </ul>
        
    </div>
    // </div>
    )
}