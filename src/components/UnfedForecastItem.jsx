import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import WeeklyForecastItem from './WeeklyForecastItem';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  dayTypography: {
    fontFamily: 'Poppins',
    fontWeight: { xs: '400', sm: '600' },
    fontSize: { xs: '12px', sm: '13px', md: '14px' },
    color: 'white',
    lineHeight: 1,
    height: '31px',
    alignItems: 'center',
    display: 'flex',
  },
  imageBox: {
    width: { xs: '24px', sm: '28px', md: '31px' },
    height: 'auto',
    marginRight: '4px',
  },
  valueTypography: {
    fontSize: { xs: '12px', md: '14px' },
    color: 'rgba(255,255,255, .8)',
    lineHeight: 1,
    fontFamily: 'Roboto Condensed',
  },
};

const UnfedForecastItem = ({ day, src, value }) => {
  return (
    <>
      <Grid
        container
        sx={{
          ...styles.container,
          alignItems: 'flex-start',
          paddingLeft: { xs: '12px', sm: '20px', md: '32px' },
        }}
      >
        <Typography sx={styles.dayTypography}>{day}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '31px',
          }}
        >
          <Box
            component="img"
            sx={styles.imageBox}
            alt="weather"
            src={src}
          />
          <Typography variant="h4" component="h4" sx={styles.valueTypography}>
            {value}
          </Typography>
        </Box>
      </Grid>

      {['temperature', 'clouds', 'wind', 'humidity'].map((type, index) => (
        <Grid
          key={type}
          container
          sx={{
            ...styles.container,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WeeklyForecastItem
            type={type}
            value={value}
            color={index < 2 ? 'black' : 'green'}
          />
        </Grid>
      ))}
    </>
  );
};

export default React.memo(UnfedForecastItem);