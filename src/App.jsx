import React, { useState, useCallback } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Search from './components/Search';
import WeeklyForecast from './components/WeeklyForecast';
import TodayWeather from './components/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utils/date-time';
import UTCDatetime from './components/UTCDatetime';
import LoadingBox from './components/LoadingBox';
import ErrorBox from './components/ErrorBox';
import { ALL_DESCRIPTIONS } from './constants/constants';
import { getTodayForecastWeather, getWeekForecastWeather } from './utils/data';

import SplashIcon from '../public/assets/splash-icon.svg';
import Logo from '/assets/logo.png';

const App = () => {
  const [weatherData, setWeatherData] = useState({
    todayWeather: null,
    todayForecast: [],
    weekForecast: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchChangeHandler = useCallback(async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');
    setIsLoading(true);
    setError(null);

    try {
      const [todayWeatherResponse, weekForecastResponse] = await fetchWeatherData(latitude, longitude);
      const currentDate = transformDateFormat();
      const dt_now = Math.floor(Date.now() / 1000);

      const todayForecast = getTodayForecastWeather(weekForecastResponse, currentDate, dt_now);
      const weekForecast = getWeekForecastWeather(weekForecastResponse, ALL_DESCRIPTIONS);

      setWeatherData({
        todayWeather: { city: enteredData.label, ...todayWeatherResponse },
        todayForecast,
        weekForecast: { city: enteredData.label, list: weekForecast },
      });
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) return <LoadingMessage />;
    if (error) return <ErrorBox margin="3rem auto" flex="inherit" errorMessage={error} />;
    if (weatherData.todayWeather) return <WeatherContent weatherData={weatherData} />;
    return <WelcomeMessage />;
  };

  return (
    <Container sx={styles.container}>
      <Grid container columnSpacing={2}>
        <Grid item xs={12}>
          <Header />
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
        {renderContent()}
      </Grid>
    </Container>
  );
};

const Header = () => (
  <Box sx={styles.header}>
    <Box component="img" sx={styles.logo} alt="logo" src={Logo} />
    <UTCDatetime />
    <Link href="https://github.com/Amin-Awinti" target="_blank" underline="none" sx={styles.githubLink}>
      <GitHubIcon sx={styles.githubIcon} />
    </Link>
  </Box>
);

const LoadingMessage = () => (
  <Box sx={styles.loadingBox}>
    <LoadingBox value="1">
      <Typography variant="h3" component="h3" sx={styles.loadingText}>
        Loading...
      </Typography>
    </LoadingBox>
  </Box>
);

const WelcomeMessage = () => (
  <Box sx={styles.welcomeBox}>
    <SplashIcon sx={styles.splashIcon} />
    <Typography variant="h4" component="h4" sx={styles.welcomeText}>
      Explore current weather data and 6-day forecast of more than 200,000 cities!
    </Typography>
  </Box>
);

const WeatherContent = ({ weatherData }) => (
  <React.Fragment>
    <Grid item xs={12} md={6}>
      <TodayWeather data={weatherData.todayWeather} forecastList={weatherData.todayForecast} />
    </Grid>
    <Grid item xs={12} md={6}>
      <WeeklyForecast data={weatherData.weekForecast} />
    </Grid>
  </React.Fragment>
);

const styles = {
  container: {
    maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
    width: '100%',
    height: '100%',
    margin: '0 auto',
    padding: '1rem 0 3rem',
    marginBottom: '1rem',
    borderRadius: { xs: 'none', sm: '0 0 1rem 1rem' },
    boxShadow: { xs: 'none', sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px' },
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '1rem',
  },
  logo: {
    height: { xs: '16px', sm: '22px', md: '26px' },
    width: 'auto',
  },
  githubLink: { display: 'flex' },
  githubIcon: {
    fontSize: { xs: '20px', sm: '22px', md: '26px' },
    color: 'white',
    '&:hover': { color: '#2d95bd' },
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '500px',
  },
  loadingText: {
    fontSize: { xs: '10px', sm: '12px' },
    color: 'rgba(255, 255, 255, .8)',
    lineHeight: 1,
    fontFamily: 'Poppins',
  },
  welcomeBox: {
    xs: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '500px',
  },
  splashIcon: {
    fontSize: { xs: '100px', sm: '120px', md: '140px' },
  },
  welcomeText: {
    fontSize: { xs: '12px', sm: '14px' },
    color: 'rgba(255,255,255, .85)',
    fontFamily: 'Poppins',
    textAlign: 'center',
    margin: '2rem 0',
    maxWidth: '80%',
    lineHeight: '22px',
  },
};

export default App;