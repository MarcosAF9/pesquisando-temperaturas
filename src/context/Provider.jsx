import React, { useState } from "react";
import WeatherContext from "./WeatherContext";
import clear_icon from "../assets/clear.png";

const Provider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState("");
  const [icon, setIcon] = useState(clear_icon);

  return (
    <WeatherContext.Provider
      value={{
        search,
        setSearch,
        data,
        setData,
        isLoading,
        setIsLoading,
        notFound,
        setNotFound,
        icon,
        setIcon,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default Provider;
