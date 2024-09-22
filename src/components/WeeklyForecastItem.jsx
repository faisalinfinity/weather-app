import React from 'react';
import { Box, SvgIcon, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import HumidityIcon from "../../public/assets/humidity.svg";

const iconMap = {
  temperature: ThermostatIcon,
  wind: AirIcon,
  clouds: FilterDramaIcon,
  humidity: HumidityIcon,
};

const WeeklyForecastItem = ({ value, type }) => {
  const Icon = iconMap[type] || null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '31px',
        color: 'rgba(255, 255, 255, .7)',
        gap: { xs: '3px', sm: '4px', md: '6px' },
        width: '100%',
      }}
    >
      {Icon && (
        <Icon
          component={type === 'humidity' ? SvgIcon : undefined}
          inheritViewBox={type === 'humidity'}
          sx={{
            fontSize: { xs: '15px', sm: '16px', md: '18px' },
          }}
        />
      )}
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '12px', sm: '13px' },
          fontWeight: { xs: '400', sm: '600' },
          color: 'white',
          fontFamily: 'Poppins',
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default React.memo(WeeklyForecastItem);