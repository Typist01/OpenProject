import React, { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import "./NavBar.scss"
import { Link } from "react-router-dom";
import { Theme } from "../../constants";
import { getTheme, useLocalStorage } from "../../utils";


export default function NavBar() {
    const [theme, setTheme] = useLocalStorage("theme", getTheme());
    const [themeText, setThemeText] = useState<string>(theme === Theme.L ? "🌑" : "🔆");

    return (
        <header className={theme}>
            <div className="nav-flex-container">
                <Link to="/">
                    <div className="logo-container">
                        <h1 className="logo">Logo</h1>
                    </div>
                </Link>

                <button id="theme-toggle" onClick={() => {
                    if (theme === Theme.L) {
                        setTheme(Theme.D);
                        setThemeText("🔆");
                        document.body.classList.remove("L");
                        document.body.classList.add("D");
                        window.dispatchEvent(new Event("storage"));
                    }
                    else {
                        setTheme(Theme.L);
                        setThemeText("🌑");
                        document.body.classList.remove("D");
                        document.body.classList.add("L");
                        window.dispatchEvent(new Event("storage"));
                    }
                }}>{themeText}</button>

                <div className="search-back-div">
                    <Searchbar />
                </div>
            </div>
        </header>
    )
}
