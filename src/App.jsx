import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import Details from "./components/Details";
import { useEffect, useState } from "react";
import Error from "./components/Error";

function App() {
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [name, setName] = useState();
  const [country, setCountry] = useState();
  useEffect(() => {
    const fetchCity = async () => {
      try {
        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=4927c9b7db462d3c970a7f50860e225c`);
        console.log(response);
        if (response.ok) {
          let weather = await response.json();
          setLat(weather[0].lat);
          setLon(weather[0].lon);
          setName(weather[0].name);
          setCountry(weather[0].country);
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch (err) {
        console.log(err);
        setIsError(true);
      }
    };
    if (search) {
      fetchCity();
    }
  });
  return (
    <div>
      {isError && <Error />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage search={search} setSearch={setSearch} />} />
          <Route path="/Details" element={<Details lat={lat} lon={lon} name={name} country={country} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
