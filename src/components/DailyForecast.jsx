import React from "react";
import { Grid, Typography } from "@mui/material";
import DailyForecastItem from "./DailyForecastItem";
import ErrorBox from "./ErrorBox";
import Layout from "./Layout";

const subHeaderStyle = {
  fontSize: { xs: "10px", sm: "12px" },
  textAlign: "center",
  lineHeight: 1,
  color: "#04C4E0",
  fontFamily: "Roboto Condensed",
  marginBottom: "1rem",
};

const gridContainerStyle = {
  display: "flex",
  justifyContent: "center",
  width: "fit-content",
};

const gridItemStyle = {
  marginBottom: { xs: "1rem", sm: "0" },
};

const DailyForecast = ({ data, forecastList }) => {
  const isDataValid =
    data &&
    forecastList &&
    Object.keys(data).length > 0 &&
    data.cod !== "404" &&
    forecastList.cod !== "404";
  const hasForecast = isDataValid && forecastList.length > 0;

  const renderSubHeader = () => {
    if (!isDataValid) return null;
    if (forecastList.length === 0) {
      return (
        <ErrorBox
          flex="1"
          type="info"
          margin="2rem auto"
          errorMessage="No available forecasts for tonight."
        />
      );
    }
    return (
      <Typography variant="h5" component="h5" sx={subHeaderStyle}>
        {`${forecastList.length} available forecast${
          forecastList.length === 1 ? "" : "s"
        }`}
      </Typography>
    );
  };

  const renderContent = () => {
    if (!isDataValid) return <ErrorBox flex="1" type="error" />;
    if (!hasForecast) return null;

    return (
      <Grid item container xs={12} sx={gridContainerStyle} spacing="4px">
        {forecastList.map((item, idx) => (
          <Grid
            key={idx}
            item
            xs={4}
            sm={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={gridItemStyle}
          >
            <DailyForecastItem item={item} data={data} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Layout
      title="TODAY'S FORECAST"
      content={renderContent()}
      sectionSubHeader={renderSubHeader()}
      sx={{ marginTop: "2.9rem" }}
      mb="0.3rem"
    />
  );
};

export default React.memo(DailyForecast);
