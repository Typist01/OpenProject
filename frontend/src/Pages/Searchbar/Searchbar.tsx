import React, { useState } from "react";

const Searchbar = () => {
    const [tExists, setTExists] = useState(false);
    return (
    <div className="searchbar">
        <input style={{ height: "100px" }} id="searchbarInput" type="text" onChange={e => setTExists(e.target.value.length > 0 ? true : false)}>
            <h4>{tExists ? "" : "Search..."}</h4>
        </input>
    </div>
    )
};
export default Searchbar;