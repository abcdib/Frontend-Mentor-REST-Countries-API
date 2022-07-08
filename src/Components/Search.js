import React, { useState } from 'react'
import { useGlobalContext } from './Context';

const Search = () => {
    const [showRegion, setShowRegion] = useState();

    const { query, setQuery, darkMode, region, setRegion } = useGlobalContext();
    console.log(region);
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Searched for : ", query);
    }

    const handleFilter = (e) => {
        setQuery("");
        console.log(e.target.innerHTML);
        if (e.target.innerHTML === "Show All")
            setRegion("all");
        else
            setRegion(e.target.innerHTML);
        setShowRegion(false);
    }

    if (query !== "")
        setRegion("all");


    const darkModeStyle = {
        backgroundColor: "hsl(209, 23%, 22%)",
        color: "whitesmoke",
        boxShadow: "0px 1px 6px 1px rgb(36 36 36 / 20%)"
    }

    return (
        <div className='search-area'>
            <div className="search" >
                <form onSubmit={handleSubmit}>
                    <button type="submit" className='search-btn' style={(darkMode) ? { backgroundColor: "hsl(209, 23%, 22%)" } : {}}>
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        {/* Sub */}
                    </button>
                    <input type="text" placeholder='Search for a country...' className='search-input' value={query} onInput={(e) => setQuery(e.target.value)} style={(darkMode) ? darkModeStyle : {}} />
                </form>
            </div>
            <div className="filter-area">
                <div className="filter" style={(darkMode) ? darkModeStyle : {}} onClick={() => setShowRegion(!showRegion)}>
                    <span>{(region === "all") ? "Filter by Region" : region}</span>
                    <div className="icon-area">
                        {(showRegion) ? <i className="fa-solid fa-angle-up filter-arrow" ></i> : <i className="fa-solid fa-angle-down filter-arrow"></i>}
                    </div>
                </div>
                {showRegion && <div className="filter-results" style={(darkMode) ? darkModeStyle : {}}>
                    <ul className='country-list'>
                        <li className='country-name' onClick={handleFilter}>
                            Show All
                        </li>
                        <li className='country-name' onClick={handleFilter}>
                            Africa
                        </li>
                        <li className='country-name' onClick={handleFilter}>
                            America
                        </li>
                        <li className='country-name' onClick={handleFilter}>
                            Asia
                        </li>
                        <li className='country-name' onClick={handleFilter}>
                            Europe
                        </li>
                        <li className='country-name' onClick={handleFilter}>
                            Oceania
                        </li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Search