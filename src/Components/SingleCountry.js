import React, { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import BorderCountry from './BorderCountry';
import useFetchCountry from './useFetchCountry';
import Spinner from './Spinner';
import SpinnerWhite from './SpinnerWhite';
import { useGlobalContext } from './Context';

const SingleCountry = () => {
    let params = useParams();
    let navigate = useNavigate();
    const { darkMode } = useGlobalContext();
    const [borderLoading, setBorderLoading] = useState(false);

    const { countryList, loading, error } = useFetchCountry({ type: "id", query: `${params.countryID}` });
    const country = countryList[0];

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

    const languages = Object.values(country.languages);

    let listOfLanguages = "";
    languages.forEach(lang => {
        listOfLanguages += lang + ", ";
    });

    listOfLanguages = listOfLanguages.slice(0, -2);

    const darkModeStyle = {
        backgroundColor: "hsl(209, 23%, 22%)",
        color: "whitesmoke",
        boxShadow: "0px 1px 6px 1px rgb(36 36 36 / 20%)"
    }


    return (
        <div className='details-container' style={(darkMode) ? { color: "whitesmoke" } : {}}>
            <button className="back-button" onClick={() => navigate(-1)} style={(darkMode) ? darkModeStyle : {}}>
                <i className="fa-solid fa-arrow-left-long"></i>
                <span>Back</span>
            </button>
            <div className="details-country">
                <div className="details-image">
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={(darkMode) ? darkModeStyle : {}} />
                </div>
                <div className="details-text">
                    <h2>{country.name.common}</h2>
                    <div className="first-section">
                        <div><span className='info-head'>Native Name: </span><small className='info-details'>{Object.entries(country.name.nativeName)[0][1].common}</small></div>
                        <div><span className='info-head'>Population: </span><small className='info-details'>{Number(country.population).toLocaleString()}</small></div>
                        <div><span className='info-head'>Region: </span><small className='info-details'>{country.region}</small></div>
                        <div><span className='info-head'>Sub Region: </span><small className='info-details'>{country.subregion}</small></div>
                        <div><span className='info-head'>Capital: </span><small className='info-details'>{country.capital[0]}</small></div>
                    </div>

                    <div className="second-section">
                        <div><span className='info-head'>Top Level Domain: </span><small className='info-details'>{country.tld[0]}</small></div>
                        <div><span className='info-head'>Currencies: </span><small className='info-details'>{Object.entries(country.currencies)[0][1].name} {Object.entries(country.currencies)[0][1].symbol}</small></div>
                        <div><span className='info-head'>Languages: </span><small className='info-details'>{listOfLanguages}</small></div>
                    </div>

                    <div className="third-section">
                        <h3>Border Countries: </h3>
                        {!country.borders && <p className='error-message' style={(darkMode) ? { color: "whitesmoke" } : {}}>No countries to show</p>}



                        {borderLoading && <div className="border-loading">{(darkMode === true) ? <SpinnerWhite /> : <Spinner />}</div>}
                        <ul className="border-countries-list">
                            {country.borders && country.borders.map(border => <BorderCountry key={border} border={border} setBorderLoading={setBorderLoading} />)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCountry