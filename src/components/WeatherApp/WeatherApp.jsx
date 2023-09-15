import "./WeatherApp.css";

import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import wind_icon from "../../assets/wind.png";
import humidity_icon from "../../assets/humidity.png";
import { useState } from "react";

const WeatherApp = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState("");
  const [icon, setIcon] = useState(clear_icon);

  const handleSearch = async () => {
    setNotFound("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric&lang=pt_br`
      );
      const json = await response.json();
      setData(json);
      switch (json.weather[0].main) {
        case "Clear":
          setIcon(clear_icon);
          break;
        case "Rain":
          setIcon(rain_icon);
          break;
        case "Clouds":
          setIcon(cloud_icon);
          break;
        case "Snow":
          setIcon(snow_icon);
          break;
        case "Drizzle":
          setIcon(drizzle_icon);
          break;
      }
      setIsLoading(false);
    } catch (error) {
      setNotFound("Cidade não encontrada");
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-icon" onClick={handleSearch}>
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>
      {isLoading ? (
        <h2 style={{ color: "#fff" }}>Carregando...</h2>
      ) : notFound === "Cidade não encontrada" ? (
        <h2 style={{ color: "#fff" }}>{notFound}</h2>
      ) : !data ? (
        <h2 style={{ color: "#fff" }}>Digite o nome da cidade</h2>
      ) : (
        <>
          <div className="weather-image">
            <img src={icon} alt="weather-icon" />
          </div>
          <div className="weather-condition">
            {data &&
              data.weather &&
              data.weather[0] &&
              data.weather[0].description && (
                <p>{data.weather[0].description}</p>
              )}
          </div>
          <div className="weather-temp">
            {data && data.main && data.main.temp}°C
          </div>
          <div className="weather-location">
            {data && data.name && data.name}
            <img
              src={`https://flagsapi.com/${data?.sys?.country}/shiny/64.png`}
            />
          </div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="humidity-icon" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {data && data.main && data.main.humidity}%
                </div>
                <div className="text">Umidade</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="wind-icon" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {data && data.wind && data.wind.speed} km/h
                </div>
                <div className="text">Velocidade do vento</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
