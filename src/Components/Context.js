import React, { useContext, useState } from "react";
import useFetchCountry from "./useFetchCountry";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("all");
    const { countryList, loading, error } = useFetchCountry({ type: "default", query: `${query}`, region: `${region}` });
    const [darkMode, setDarkMode] = useState(false);

    return <AppContext.Provider value={{ countryList, loading, error, darkMode, setDarkMode, query, setQuery, region, setRegion }}>{children}</AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext }