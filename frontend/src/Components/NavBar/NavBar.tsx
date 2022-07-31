import React from "react";
import Searchbar from "../Searchbar/Searchbar";
import "./NavBar.scss"
import { Link } from "react-router-dom";


export default function NavBar() {
    return (
        <header>

            <div className="nav-flex-container" >
                <Link to="/">
                    <div className="logo-container">
                        <h1 className="logo">Logo</h1>
                    </div>
                </Link>

                <div className="search-back-div">
                    <Searchbar />
                </div>
                {/* <nav className="links-container"> */}
                {/* links just for testing purposes, real links in nav bar should be different */}

                {/* <ul className="nav-links">
                    <li><a href="/create-project"> /create-project</a></li>
                    <li><a href="/project">/Project</a></li>
                    <li><Link to="/community">/community</Link></li>
                    <li><a href="/project/task/1">task view</a></li>
                </ul> */}
                {/* </nav> */}

            </div>
        </header >

    )

}

