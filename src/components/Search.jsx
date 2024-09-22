import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { fetchCities } from "../api/OpenWeatherService";

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 400,
  margin: "0 auto",
  color: "white",
  padding: "5px 5px 5px 5px",
}));

const SuggestionsContainer = styled(Paper)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  marginTop: theme.spacing(1),
  left: 0,
  right: 0,
  maxHeight: 200,
  overflow: "auto",
}));

const Search = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (input) => {
    setLoading(true);
    try {
      const citiesList = await fetchCities(input);
      const mappedSuggestions = citiesList.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));
      setSuggestions(mappedSuggestions);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
      return;
    }
    debouncedFetchSuggestions(inputValue);
  }, [inputValue, debouncedFetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.label);
    setShowSuggestions(false);
    onSearchChange(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[0]);
      }
    }
  };

  const handleSubmit = () => {
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <SearchContainer>
      <TextField
        fullWidth
        inputRef={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search for cities"
        variant="outlined"
        sx={{ input: { color: "white" } }}
        InputProps={{
          endAdornment: (
            <>
              {loading && <CircularProgress color="inherit" size={20} />}
              <IconButton onClick={handleSubmit}>
                <SearchIcon />
              </IconButton>
            </>
          ),
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <SuggestionsContainer ref={suggestionsRef}>
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={suggestion.value}
                onClick={() => handleSuggestionClick(suggestion)}
                selected={index === selectedIndex}
                button
                sx={{ cursor: "pointer" }}
              >
                <ListItemText primary={suggestion.label} />
              </ListItem>
            ))}
          </List>
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
};

export default Search;
