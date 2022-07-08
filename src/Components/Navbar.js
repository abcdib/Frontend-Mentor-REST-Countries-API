import React from 'react'
import { useGlobalContext } from './Context'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { darkMode, setDarkMode, setQuery, setRegion } = useGlobalContext();
    let navigate = useNavigate();

    const darkModeStyle = {
        backgroundColor: "hsl(209, 23%, 22%)",
        color: "whitesmoke",
        boxShadow: "0px 2px 4px 1px rgb(36 36 36 / 20%)"
    }

    if (darkMode)
        document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
    else
        document.body.style.backgroundColor = "#fafafa";


    return (
        <div className="navbar" style={(darkMode) ? darkModeStyle : {}}>
            <h1 onClick={() => { navigate("/"); setQuery(""); setRegion("all"); }}>Where in the World?</h1>
            <div className="dark-mode" onClick={() => setDarkMode(!darkMode)}>
                {(darkMode === false) ? <><i className="fa-solid fa-moon"></i><span>Dark mode</span></> : <><i className="fa-solid fa-sun"></i><span>Light mode</span></>}
            </div>
        </div>
    )
}

export default Navbar