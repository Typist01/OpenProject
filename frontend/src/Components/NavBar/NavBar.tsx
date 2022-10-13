import React, { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { Link } from "react-router-dom";
import { Theme } from "../../constants";
import { getTheme, useLocalStorage } from "../../utils";
import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from "./Menu";




export default function NavBar() {
    const [theme, setTheme] = useLocalStorage("theme", getTheme());
    const [themeText, setThemeText] = useState<string>(theme === Theme.L ? "🌑" : "🔆");
    const [menuVisible, setMenuVisible] = useState(false);
    const closeMenu = () => setMenuVisible(false);


    return (
        <React.Fragment>
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
                    <button className="menu-icon" onClick={() => setMenuVisible(v => !v)}>
                        <MenuIcon />
                    </button>
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
            </header>
            <Menu menuVisible={menuVisible} closeMenu={closeMenu} />
        </React.Fragment>


    )
}
