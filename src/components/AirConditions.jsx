import React from "react";
import ErrorBox from "./ErrorBox";
import AirConditionsItem from "./AirConditionsItem";
import Layout from "./Layout";
import { celsiusToFahrenheit } from "../utils/data";
import { useTemperature } from "../context/ToggleTemperature";

const TodayWeatherAirConditions = ({ data }) => {
  const { isCelsius } = useTemperature();

  if (!data || Object.keys(data).length === 0 || data.cod === "404") {
    return (
      <Layout
        title="AIR CONDITIONS"
        content={<ErrorBox flex="1" type="error" />}
        mb="1rem"
        sx={{ marginTop: "2.9rem" }}
      />
    );
  }

  const formatTemperature = (temp) =>
    `${Math.round(isCelsius ? temp : celsiusToFahrenheit(temp))} ${
      isCelsius ? "°C" : "°F"
    }`;

  const airConditions = [
    {
      title: "Real Feel",
      value: formatTemperature(data.main.feels_like),
      type: "temperature",
    },
    {
      title: "Wind",
      value: `${data.wind.speed} m/s`,
      type: "wind",
    },
    {
      title: "Clouds",
      value: `${Math.round(data.clouds.all)} %`,
      type: "clouds",
    },
    {
      title: "Humidity",
      value: `${Math.round(data.main.humidity)} %`,
      type: "humidity",
    },
  ];

  const content = airConditions.map((condition, index) => (
    <AirConditionsItem key={index} {...condition} />
  ));

  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{ marginTop: "2.9rem" }}
    />
  );
};

export default React.memo(TodayWeatherAirConditions);
