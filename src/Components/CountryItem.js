import React from 'react'
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from './Context';
const CountryItem = (props) => {
    const { darkMode } = useGlobalContext();
    const { name, flags, capital, population, region, cca3 } = props.country;
    let navigate = useNavigate();

    let listOfCapitals = "";
    if (capital !== undefined) {
        capital.forEach(city => {
            listOfCapitals += city + ", ";
        });

        listOfCapitals = listOfCapitals.slice(0, -2);
    }

    const darkModeStyle = {
        backgroundColor: "hsl(209, 23%, 22%)",
        color: "whitesmoke",
        boxShadow: "0px 1px 6px 1px rgb(36 36 36 / 20%)"
    }


    return (
        <div className='card' onClick={() => navigate(`/country/${cca3.toLowerCase()}`)} style={(darkMode) ? darkModeStyle : {}}>
            <div className="card-image">
                <img src={flags.svg} alt={`Flag of ${name.common}`} style={(darkMode) ? darkModeStyle : {}} />
            </div>
            <div className="card-body">
                <h3 className='card-heading'>{name.common}</h3>
                <div><span className='info-head'>Population: </span><small className='info-details'>{Number(population).toLocaleString()}</small></div>
                <div><span className='info-head'>Region: </span><small className='info-details'>{region}</small></div>
                <div><span className='info-head'>Capital: </span><small className='info-details'>{listOfCapitals}</small></div>
            </div>
        </div>
    )
}

export default CountryItem