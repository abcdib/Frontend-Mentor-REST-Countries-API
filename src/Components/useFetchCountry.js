import { useEffect, useState } from "react";

const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3";
const API_BY_ID = "https://restcountries.com/v3.1/alpha/";
const API_BY_NAME = "https://restcountries.com/v3.1/name/";
const API_BY_REGION = "https://restcountries.com/v3.1/region/";

const useFetchCountry = (apiParams) => {
    const [countryList, setCountryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({ show: false, message: "" });


    const getCountries = async (url) => {
        setLoading(true);
        try {
            const data = await fetch(url);
            const resp = await data.json();
            if (data.status === 500) {
                setError({
                    show: true,
                    message: "Country not found"
                })
                setCountryList([]);
            }
            else {
                setError({
                    show: false,
                    message: ""
                })
                setCountryList(resp);
            }
            setLoading(false);
        } catch (error) {
            setError({
                show: true,
                message: "Internal Server Error"
            })
            setLoading(false);
        }
    }

    useEffect(() => {
        let searchTimer = setTimeout(() => {
            if (apiParams.type === "default") {
                if (apiParams.region !== "all" && apiParams.query === "") {
                    console.log("searching for countries with region: ", apiParams.region);
                    getCountries(API_BY_REGION + apiParams.region);
                }
                else if (apiParams.query === "") {
                    console.log("Showing default list");
                    getCountries(API_URL);
                }
                else {
                    console.log("searching for countries with name: ", apiParams.query);
                    getCountries(API_BY_NAME + apiParams.query);
                }
            }
            else if (apiParams.type === "id") {
                console.log("searching for countries with id: ", apiParams.query);
                getCountries(API_BY_ID + apiParams.query);
            }
        }, 800);
        return () => clearTimeout(searchTimer);

    }, [apiParams.query, apiParams.type, apiParams.region])
    return { countryList, loading, error }
}

export default useFetchCountry