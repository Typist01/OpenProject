import React, { useEffect, useState } from "react";
import { api } from "../../constants";
import "./Searchbar.scss"

enum ResultType {
    User = "User"
}

const SearchResults = ({
    results, query
}: {
    results: Record<string, ResultType>;
    query: string;
}) => (
    <div className="result-container">
        <ul className="results">
            {Object.entries(results).filter(x => x[0].includes(query)).map((x, i, arr) => (
                <li
                    className="result"
                    id={i === arr.length - 1 ? "last-result" : ""}
                >
                    <button className="result-button">
                        <p className="result-name">{x[0]}</p>
                        <code className="result-type">{x[1]}</code>
                    </button>
                    {/* w */}
                </li>
            ))}
        </ul>
    </div>
);

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [resultsData, setResultsData] = useState<Record<string, ResultType>>({});

    useEffect(() => {
        fetch(api + "users")
            .then(x => x.json())
            .then((data: any[]) => {
                data.forEach(x => setResultsData(r => ({ ...r, [x.name]: ResultType.User })));
            });
    }, [query]);

    return (
        <div className="search-bar">
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            <div className={query.trim().length === 0 ? "hidden" : ""}>
                <SearchResults
                    results={resultsData}
                    query={query.trim()}
                />
            </div>
        </div>
    );
}

export default SearchBar;