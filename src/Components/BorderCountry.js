import React from 'react'
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from './Context';
import useFetchCountry from './useFetchCountry';

const BorderCountry = (props) => {
    let navigate = useNavigate();
    const { darkMode } = useGlobalContext();
    const { countryList, loading } = useFetchCountry({ type: "id", query: `${props.border.toLowerCase()}` });

    const darkModeStyle = {
        backgroundColor: "hsl(209, 23%, 22%)",
        color: "whitesmoke",
        boxShadow: "0px 1px 6px 1px rgb(36 36 36 / 20%)"
    }

    if (loading) {
        props.setBorderLoading(true);
        return (<></>)
    }
    props.setBorderLoading(false);

    return (
        <li className="border-country" onClick={() => navigate(`../country/${props.border.toLowerCase()}`)} style={(darkMode) ? darkModeStyle : {}}>{countryList[0].name.common}</li>
    )
}

export default BorderCountry