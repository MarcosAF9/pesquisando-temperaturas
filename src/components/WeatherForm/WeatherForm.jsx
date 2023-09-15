import { useContext } from "react";
import search_icon from "../../assets/search.png";
import clear_icon from "../../assets/clear.png";
import cloud_icon from "../../assets/cloud.png";
import drizzle_icon from "../../assets/drizzle.png";
import rain_icon from "../../assets/rain.png";
import snow_icon from "../../assets/snow.png";
import WeatherContext from "../../context/WeatherContext";
import "./WeatherForm.css";

const WeatherForm = () => {
  const { search, setSearch, setData, setIsLoading, setNotFound, setIcon } =
    useContext(WeatherContext);

  const handleSearch = async (e) => {
    e.preventDefault();
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
    <form className="form" onSubmit={handleSearch}>
      <input
        type="text"
        className="cityInput"
        placeholder="Pesquisar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="search-icon">
        <img src={search_icon} alt="search-icon" />
      </button>
    </form>
  );
};

export default WeatherForm;
