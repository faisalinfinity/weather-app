import React from "react";
import { Grid } from "@mui/material";
import { getDayMonthFromDate } from "../utils/date-time";
import ErrorBox from "./ErrorBox";
import CityDateDetail from "./CityDateDetail";
import TemperatureWeatherDetail from "./TemperatureWeatherDetail";
import WeatherIconDetail from "./WeatherIconDetail";
import Layout from "./Layout";

const gridItemStyle = {
  height: "80px",
};

const iconGridStyle = {
  ...gridItemStyle,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Details = ({ data }) => {
  const dayMonth = getDayMonthFromDate();

  if (!data || Object.keys(data).length === 0 || data.cod === "404") {
    return (
      <Layout
        title="CURRENT WEATHER"
        content={<ErrorBox flex="1" type="error" />}
      />
    );
  }

  const content = (
    <>
      <Grid item xs={4} sx={gridItemStyle}>
        <CityDateDetail city={data.city} date={dayMonth} />
      </Grid>
      <Grid item xs={4} sx={gridItemStyle}>
        <TemperatureWeatherDetail
          temperature={data.main.temp}
          description={data.weather[0].description}
        />
      </Grid>
      <Grid item xs={4} sx={iconGridStyle}>
        <WeatherIconDetail src={`/assets/icons/${data.weather[0].icon}.png`} />
      </Grid>
    </>
  );

  return <Layout title="CURRENT WEATHER" content={content} />;
};

export default React.memo(Details, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
