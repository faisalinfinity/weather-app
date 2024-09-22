import React, { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Container, Grid } from "@mui/material";
import Search from "./components/Search";
import { fetchWeatherData } from "./api/OpenWeatherService";
import { transformDateFormat } from "./utils/date-time";
import ErrorBox from "./components/ErrorBox";
import { ALL_DESCRIPTIONS } from "./constants/constants";
import { getTodayForecastWeather, getWeekForecastWeather } from "./utils/data";
import { useTemperature } from "./context/ToggleTemperature";
import ToggleTemperature from "./components/ToggleTemperature";
import { styles } from "./styles/styles";
import LoadingMessage from "./components/LoadingMessage";
import Header from "./components/Header";
import { useCache } from "./hooks/useCache";

const WeatherContent = lazy(() => import("./components/WeatherContent"));
const WelcomeMessage = lazy(() => import("./components/WelcomeMessage"));

const App = () => {
  const [weatherData, setWeatherData] = useState({
    todayWeather: null,
    todayForecast: [],
    weekForecast: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isCelsius } = useTemperature();
  const { getCachedData, setCachedData } = useCache();

  const getData = useCallback(
    async (latitude, longitude, label) => {
      setIsLoading(true);
      setError(null);
      try {
        const cachedData = getCachedData(label);
        if (cachedData) {
          setWeatherData(cachedData);
          setIsLoading(false);
          return;
        }

        const [todayWeatherResponse, weekForecastResponse] =
          await fetchWeatherData(latitude, longitude);
        const currentDate = transformDateFormat();
        const dt_now = Math.floor(Date.now() / 1000);

        const todayForecast = getTodayForecastWeather(
          weekForecastResponse,
          currentDate,
          dt_now
        );
        const weekForecast = getWeekForecastWeather(
          weekForecastResponse,
          ALL_DESCRIPTIONS
        );

        const newWeatherData = {
          todayWeather: { city: label, ...todayWeatherResponse },
          todayForecast,
          weekForecast: { city: label, list: weekForecast },
        };

        setWeatherData(newWeatherData);
        setCachedData(label, newWeatherData);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [getCachedData, setCachedData]
  );

  const searchChangeHandler = useCallback(
    (enteredData) => {
      const [latitude, longitude] = enteredData.value.split(" ");
      getData(latitude, longitude, enteredData.label);
    },
    [getData]
  );

  useEffect(() => {
    const lastSearched = localStorage.getItem("lastSearched");
    if (lastSearched) {
      const { latitude, longitude, label } = JSON.parse(lastSearched);
      getData(latitude, longitude, label);
    } else {
      const newDelhiCoordinates = {
        latitude: 28.6139,
        longitude: 77.209,
        label: "New Delhi, IN",
      };
      getData(
        newDelhiCoordinates.latitude,
        newDelhiCoordinates.longitude,
        newDelhiCoordinates.label
      );
    }
  }, [getData]);

  useEffect(() => {
    const { latitude, longitude, label } = JSON.parse(
      localStorage.getItem("lastSearched") || "{}"
    );
    getData(latitude, longitude, label);
  }, [getData]);

  const renderContent = () => {
    if (isLoading) return <LoadingMessage />;
    if (error)
      return (
        <ErrorBox margin="3rem auto" flex="inherit" errorMessage={error} />
      );
    if (weatherData.todayWeather)
      return (
        <Suspense fallback={<LoadingMessage />}>
          <WeatherContent weatherData={weatherData} />
        </Suspense>
      );
    return (
      <Suspense fallback={<LoadingMessage />}>
        <WelcomeMessage />
      </Suspense>
    );
  };

  return (
    <Container sx={styles.container}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Header />
          <Search onSearchChange={searchChangeHandler} />
          <ToggleTemperature />
        </Grid>
        {renderContent()}
      </Grid>
    </Container>
  );
};

export default App;
