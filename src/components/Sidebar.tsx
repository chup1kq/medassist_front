import React, {useEffect, useState} from "react";
import "../static/Sidebar.scss";
import {SearchResult} from "../data/SearchResult";

interface Props {
    expanded: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<Props> = ({expanded, onToggle}) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {

    }, [query]);

    let searchResultsComponent;

    if (results.length > 0) {
        searchResultsComponent = (
            <div className="search-results">
                {results.map((result) => (
                    <a
                        key={result.id ?? result.link ?? `${result.name}-${result.type}`}
                        href={result.link}
                        className="search-result-item"
                    >
                        <span className="result-type">{result.type}</span>
                        <span className="result-name">{result.name}</span>
                    </a>
                ))}
            </div>
        );
    } else if (results.length === 0 && query.length > 0) {
        searchResultsComponent = (
            <div className="no-results">Ничего не найдено</div>
        )
    }

    return (
        <div className="sidebar">
            <div className="header">
                <a href={"/"}>Главная</a>
                <button className="expand-btn" onClick={onToggle}>
                    {expanded ? "←" : "→"}
                </button>
            </div>

            <input
                type="text"
                placeholder="Поиск..."
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {searchResultsComponent}
        </div>
    );
};

export default Sidebar;