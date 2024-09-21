import React, { useState, useEffect, useCallback } from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";
import { fetchCities } from "../api/OpenWeatherService";

const Search = ({ onSearchChange }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchOptions = async (input) => {
    setLoading(true);
    try {
      const citiesList = await fetchCities(input);
      const mappedOptions = citiesList.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));
      setOptions(mappedOptions);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchOptions = useCallback(debounce(fetchOptions, 300), []);

  useEffect(() => {
    if (inputValue === "") {
      setOptions([]);
      return;
    }

    debouncedFetchOptions(inputValue);

    return () => {
      setOptions([]);
    };
  }, [inputValue, debouncedFetchOptions]);

  return (
    <Autocomplete
      id="city-search"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        onSearchChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for cities"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
