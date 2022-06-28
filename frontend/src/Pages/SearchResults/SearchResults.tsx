import React from "react";
import "./SearchResults.scss";
const SearchResultsPage = () => {
    return (
        <React.Fragment>
            <h1>Search Results for ___ </h1>
            <div className="search-result">
                <h1 className="search-result-title">Result Name</h1>
                <h6 className="search-tag">community/project tag</h6>
            </div>
        </React.Fragment>
    )
}


export default SearchResultsPage;