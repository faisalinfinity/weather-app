import React from "react";
import ErrorBox from "./ErrorBox";
import AirConditionsItem from "./AirConditionsItem";
import Layout from "./Layout";
import { celsiusToFahrenheit } from "../utils/data";
import { useTemperature } from "../context/ToggleTemperature";
const TodayWeatherAirConditions = ({ data }) => {
  const { isCelsius } = useTemperature();
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>
        <AirConditionsItem
          title="Real Feel"
          value={
            isCelsius
              ? `${Math.round(data.main.feels_like)} °C`
              : `${Math.round(celsiusToFahrenheit(data.main.feels_like))} °F`
          }
          type="temperature"
        />
        <AirConditionsItem
          title="Wind"
          value={`${data.wind.speed} m/s`}
          type="wind"
        />
        <AirConditionsItem
          title="Clouds"
          value={`${Math.round(data.clouds.all)} %`}
          type="clouds"
        />
        <AirConditionsItem
          title="Humidity"
          value={`${Math.round(data.main.humidity)} %`}
          type="humidity"
        />
      </>
    );
  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{ marginTop: "2.9rem" }}
    />
  );
};

export default TodayWeatherAirConditions;
