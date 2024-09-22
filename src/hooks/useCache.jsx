import { useState, useCallback } from 'react';

export const useCache = () => {
  const [cache, setCache] = useState(() => {
    const savedCache = localStorage.getItem('weatherCache');
    return savedCache ? JSON.parse(savedCache) : {};
  });

  const getCachedData = useCallback((key) => {
    const cachedData = cache[key];
    if (cachedData && Date.now() - cachedData.timestamp < 60 * 60 * 1000) {
      return cachedData.data;
    }
    return null;
  }, [cache]);

  const setCachedData = useCallback((key, data) => {
    const newCache = {
      ...cache,
      [key]: { data, timestamp: Date.now() },
    };
    setCache(newCache);
    localStorage.setItem('weatherCache', JSON.stringify(newCache));
    localStorage.setItem('lastSearched', JSON.stringify({ 
      latitude: data.todayWeather.coord.lat, 
      longitude: data.todayWeather.coord.lon, 
      label: data.todayWeather.city 
    }));
  }, [cache]);

  return { getCachedData, setCachedData };
};