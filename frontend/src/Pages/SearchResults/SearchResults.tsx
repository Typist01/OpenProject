import React from "react";
import "./SearchResults.scss";
const SearchResultsPage = () => {
    return (
        <React.Fragment>
            <h1>Search Results for ___ </h1>
            <div className="search-result">
                <h1 className="search-result-title">Result Name</h1>
                <h6 className="search-tag">community/project tag</h6>
                <p className="result-description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur distinctio, fuga iste officiis architecto tempora sequi optio, quaerat aliquid neque laborum autem voluptate quisquam voluptates excepturi quo ducimus molestias provident.</p>
            </div>
        </React.Fragment>
    )
}

export default SearchResultsPage;