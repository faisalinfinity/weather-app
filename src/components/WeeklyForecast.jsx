import React from "react";
import { Grid } from "@mui/material";
import { getWeekDays } from "../utils/date-time";
import WeeklyForecastItem from "./WeeklyForecastItem";
import ErrorBox from "./ErrorBox";
import UnfedForecastItem from "./UnfedForecastItem";
import DayWeatherDetails from "./DayWeatherDetails";
import Layout from "./Layout";
import { celsiusToFahrenheit } from "../utils/data";
import { useTemperature } from "../context/ToggleTemperature";

const forecastItemStyle = {
  padding: "2px 0 2px",
  background:
    "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
  boxShadow:
    "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
  borderRadius: "8px",
};

const gridContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const WeeklyForecast = ({ data }) => {
  const forecastDays = getWeekDays();
  const { isCelsius } = useTemperature();

  if (!data?.list?.length) {
    return (
      <Layout
        title="WEEKLY FORECAST"
        content={<ErrorBox type="error" />}
        mb=".8rem"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 0 0",
        }}
      />
    );
  }

  const formatTemperature = (temp) =>
    `${Math.round(isCelsius ? temp : celsiusToFahrenheit(temp))} ${
      isCelsius ? "°C" : "°F"
    }`;

  return (
    <Layout
      title="WEEKLY FORECAST"
      content={
        <Grid item container display="flex" flexDirection="column" xs={12} gap="4px">
          {data.list.map((item, idx) => (
            <Grid
              item
              key={idx}
              xs={12}
              display="flex"
              alignItems="center"
              sx={forecastItemStyle}
            >
              <DayWeatherDetails
                day={forecastDays[idx]}
                src={`/assets/icons/${item.icon}`}
                description={item.description}
              />
              <Grid container sx={gridContainerStyle}>
                <WeeklyForecastItem
                  type="temperature"
                  value={formatTemperature(item.temp)}
                  color="black"
                />
                <WeeklyForecastItem
                  type="clouds"
                  value={`${item.clouds} %`}
                  color="black"
                />
              </Grid>
              <Grid container sx={gridContainerStyle}>
                <WeeklyForecastItem
                  type="wind"
                  value={`${item.wind} m/s`}
                  color="green"
                />
                <WeeklyForecastItem
                  type="humidity"
                  value={`${item.humidity} %`}
                  color="green"
                />
              </Grid>
            </Grid>
          ))}
          {data.list.length === 5 && (
            <Grid item xs={12} display="flex" alignItems="center" sx={forecastItemStyle}>
              <UnfedForecastItem
                day={forecastDays[5]}
                value="NaN"
                src={`/assets/icons/unknown.png`}
              />
            </Grid>
          )}
        </Grid>
      }
      mb=".8rem"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem 0 0",
      }}
    />
  );
};

export default React.memo(WeeklyForecast);