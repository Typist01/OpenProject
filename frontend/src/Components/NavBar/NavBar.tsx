import React, { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import "./NavBar.scss"
import { Link } from "react-router-dom";


export default function NavBar() {
    const [themeText, setThemeText] = useState<string>(localStorage.getItem("theme") === "light" ? "🌑" : "🔆");
    return (
        <header>
            <div className="nav-flex-container" >
                <Link to="/">
                    <div className="logo-container">
                        <h1 className="logo">Logo</h1>
                    </div>
                </Link>

                <button id="theme-toggle" onClick={() => {
                    if (localStorage.getItem("theme") === "light") {
                        localStorage.setItem("theme", "dark");
                        setThemeText("🔆");
                    }
                    else {
                        localStorage.setItem("theme", "light");
                        setThemeText("🌑");
                    }
                }}>{themeText}</button>

                <div className="search-back-div">
                    <Searchbar />
                </div>
            </div>
        </header>
    )
}
