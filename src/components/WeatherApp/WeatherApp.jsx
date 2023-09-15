import "./WeatherApp.css";
import wind_icon from "../../assets/wind.png";
import humidity_icon from "../../assets/humidity.png";
import { useContext } from "react";
import WeatherForm from "../WeatherForm/WeatherForm";
import WeatherContext from "../../context/WeatherContext";

const WeatherApp = () => {
  const { isLoading, notFound, data, icon } = useContext(WeatherContext);

  return (
    <div className="container">
      <WeatherForm />
      {isLoading ? (
        <h2 className="aux-text">Carregando...</h2>
      ) : notFound === "Cidade não encontrada" ? (
        <h2 className="aux-text">{notFound}</h2>
      ) : !data ? (
        <h2 className="aux-text">Digite o nome da cidade</h2>
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
