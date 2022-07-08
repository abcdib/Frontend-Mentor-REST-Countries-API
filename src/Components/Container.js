import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './Context'
import CountryItem from './CountryItem'
import Spinner from './Spinner';
import SpinnerWhite from './SpinnerWhite';

const Container = () => {
    const { countryList, loading, error, darkMode } = useGlobalContext();
    const [currList, setCurrList] = useState([]);
    const pageSize = 12;
    const [count, setCount] = useState(1);

    useEffect(() => {
        setCurrList(countryList.slice(0, pageSize));
        setCount(1);
    }, [countryList])


    if (loading) {
        if (darkMode)
            return (
                <SpinnerWhite />
            )
        return (
            <Spinner />
        )
    }
    if (error.show === true) {
        return (
            <p className='error-message' style={(darkMode) ? { color: "whitesmoke" } : {}}>{error.message}</p>
        )
    }
    const total = Math.ceil(countryList.length / pageSize);
    console.log("count: " + count + ", total: " + total);
    const loadMore = () => {
        console.log("Loading more");
        setCurrList(countryList.slice(0, (count + 1) * pageSize));
        setCount(count + 1);
    }

    const darkModeStyle = {
        backgroundColor: "hsl(209, 23%, 22%)",
        color: "whitesmoke",
        boxShadow: "0px 1px 6px 1px rgb(36 36 36 / 20%)"
    }

    return (
        <>
            <div className='container'>
                {currList.map(country => <CountryItem key={country.cca3} country={country} />)}
                {count < total && <button className="load-more-btn" onClick={loadMore} style={(darkMode) ? darkModeStyle : {}}>Load More</button>}
            </div>
        </>
    )
}

export default Container