# Weather Forecast Application

This weather forecast application is built using Vite and React. It allows users to check current weather conditions and a 6-day forecast for various cities.

## Features

- Current weather display for a default city
- City search functionality with a custom dropdown component
- 6-day weather forecast
- Temperature unit conversion (Celsius/Fahrenheit)
- Responsive design for various screen sizes
- Performance optimization with lazy loading of components
- Caching of previously searched cities for offline viewing

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/faisalinfinity/weather-app.git
   cd weather-forecast-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here     //openweathermap
   VITE_RAPID_API_KEY=your_api_key_here       //rapidapi.com
   ```

   Note: Replace `your_api_key_here` with your actual API key from the weather service provider.

## Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:

```
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Upon opening the application, you'll see the current weather for the default city.
2. Use the search bar to look up weather information for different cities.
3. Click on a city in the dropdown to select it.
4. View the current weather and 5-day forecast for the selected city.
5. Toggle between Celsius and Fahrenheit using the temperature unit switch.

## Assumptions

- The application uses a free openweathermap API and a free rapidapi.com API. Ensure you have a valid API key.
- The 5-day forecast shows data for each day at a specific time (e.g., noon).
- City search is based on the API's search capabilities and may not include all global cities.
- The application stores the last searched city in local storage for offline viewing.

## Tech Stack

- Vite
- React
- Material UI (for styling)
- [Weather API Service Name]

## Future Improvements

- Implement caching for offline viewing of previously searched cities
- Add pull-to-refresh functionality for mobile devices
- Optimize performance with lazy loading of components
- Expand error handling for various edge cases

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

