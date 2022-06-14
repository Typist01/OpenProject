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

                <Searchbar />
                <div className="nav-container flex-container">
                    <nav>
                        <ul className="nav-links">
                            {/* links just for testing purposes, real links in nav bar should be different */}
                            <li>test links:</li>
                            <li><a href="/create-project"> /create-project</a></li>
                            <li><a href="/project">/Project</a></li>
                            <li><a href="/project/task/1">task view</a></li>
                        </ul>
                    </nav>
                </div>


            </div>

        </header>

    )

}

