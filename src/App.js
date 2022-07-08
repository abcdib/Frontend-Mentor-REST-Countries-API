import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { Routes, Route } from "react-router-dom";
import SingleCountry from './Components/SingleCountry';
import ScrollToTop from './Components/ScrollToTop';
function App() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="country/:countryID" element={<SingleCountry />} />
      </Routes>
    </div>
  );
}

export default App;
