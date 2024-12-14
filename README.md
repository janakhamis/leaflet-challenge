# Earthquake Map Visualization

This project uses Leaflet.js to build an interactive map that visualizes recent earthquake data. The map shows earthquake sites with color-coded depth markers, as well as popups with magnitude and depth information. Data is fetched dynamically from the USGS GeoJSON feed (Module 15 challenge).

## Features

- Displays earthquake data from the USGS GeoJSON feed for the past week.
- Earthquake markers scaled by magnitude and color-coded by depth:
  - 🟢 Shallow depths (< 10 km)
  - 🟡 Moderate depths (10-30 km)
  - 🟠 Deeper regions (30-90 km)
  - 🔴 Very deep regions (> 90 km)
- Interactive popups for earthquake details:
  - Location
  - Magnitude
  - Depth

## Technologies Used

- **Leaflet.js** for map visualization and marker creation
- **D3.js** for fetching GeoJSON data
- **OpenStreetMap** and **CARTO** for tile layers

## Getting Started

1. Clone the repository.
2. Open the `index.html` file in a web browser.
3. The map will load earthquake data for the past week automatically.

## Usage

- Zoom and pan across the map to explore different earthquake locations.
- Click on markers to view detailed information about each earthquake.
- Refer to the legend for color-coded depth intervals.

## Data Source

Earthquake data is fetched from the [USGS GeoJSON feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php):

- **Weekly Summary**: [all_week.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

## Code Highlights

- **Dynamic Marker Styling**: Marker sizes are scaled based on earthquake magnitude, and colors are determined by depth using the `chooseColor` function.
- **Legend Integration**: A custom legend provides an intuitive depth-to-color mapping.
- **Popups**: Markers include popups with location, magnitude, and depth information.
