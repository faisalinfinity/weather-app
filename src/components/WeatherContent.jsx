import { Grid } from "@mui/material";
import WeeklyForecast from "./WeeklyForecast";
import TodayWeather from "./TodayWeather";

const WeatherContent = ({ weatherData }) => (
  <>
    <Grid item xs={12} md={6}>
      <TodayWeather
        data={weatherData.todayWeather}
        forecastList={weatherData.todayForecast}
      />
    </Grid>
    <Grid item xs={12} md={6}>
      <WeeklyForecast data={weatherData.weekForecast} />
    </Grid>
  </>
);

export default WeatherContent;
