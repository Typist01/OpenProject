import React, { useEffect, useState } from "react";
import "./Searchbar.scss"

// const Results = () => {
//     const searchResults = ["one", "two", "three"];
//     return (
//         <div className="search-results">
//             {searchResults.map(_ => <div className="search-result"></div>)}


//         </div>

//     )
// }


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
        {/* <Results /> */}
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