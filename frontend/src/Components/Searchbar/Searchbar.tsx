import React, { useEffect, useState } from "react";
import "./Searchbar.scss"


const SearchBar = () => {

    const [userQuery, setUserQuery] = useState("")

    useEffect(() => {
        console.log(userQuery)
    }, [userQuery])

    function searchHandler(e: any) {
        const val = e.target.value
        setUserQuery(val)
    }


    return (<React.Fragment>
        <input className="search-input" type="text" value={userQuery} onChange={searchHandler} />
    </React.Fragment>)
}

export default SearchBar;

// const Searchbar = () => {
//     const [tExists, setTExists] = useState(false);
//     return (
//     <div className="searchbar">
//         <input style={{ height: "100px" }} id="searchbarInput" type="text" onChange={e => setTExists(e.target.value.length > 0 ? true : false)}>
//             <h4>{tExists ? "" : "Search..."}</h4>
//         </input>
//     </div>
//     )
// };
// export default Searchbar;