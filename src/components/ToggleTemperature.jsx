import React from "react";
import { styled } from "@mui/material/styles";
import { Switch, Typography, Box } from "@mui/material";
import { useTemperature } from "../context/ToggleTemperature";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        content: `"°C"`, 
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: `"°F"`,
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const ToggleTemperature = () => {
  const { isCelsius, setIsCelsius } = useTemperature();

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <Box padding={1} display="flex" alignItems="center" gap={1}>
      <StyledSwitch checked={isCelsius} onChange={handleToggle} />
    </Box>
  );
};

export default ToggleTemperature;
