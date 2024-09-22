import React, { useContext, useState } from "react";
const ToggleTemperatureContext = React.createContext();

const ToggleTemperatureProvider = (props) => {
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <ToggleTemperatureContext.Provider value={{ isCelsius, setIsCelsius }}>
      {props.children}
    </ToggleTemperatureContext.Provider>
  );
};

export const useTemperature = () => {
  return useContext(ToggleTemperatureContext);
};

export default ToggleTemperatureProvider;
