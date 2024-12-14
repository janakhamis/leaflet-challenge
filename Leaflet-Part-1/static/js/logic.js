// Creating the map object
let myMap = L.map("map", {
    center: [38.5, -119.5], // Centered on the US
    zoom: 5.45
});

// Adding the tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
}).addTo(myMap);

// Load the GeoJSON earthquake data
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function chooseColor(depth) {
    if (depth > 90) return "#ff0000";      // Red
    else if (depth > 70) return "#ff4500"; // Orange-Red
    else if (depth > 50) return "#ff8c00"; // Dark Orange
    else if (depth > 30) return "#ffd700"; // Gold
    else if (depth > 10) return "#adff2f"; // Green-Yellow
    else return "#7fff00";                 // Light Green
}

// Getting our GeoJSON data
d3.json(geoData).then(function (data) {

    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        pointToLayer: (feature, latlng) => {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 3,
                color: "#000",
                // Call the chooseColor() function to decide which color to color the depth of the earthquake. (The color is based on the depth.)
                fillColor: chooseColor(feature.geometry.coordinates[2]),
                weight: 0.5,
                fillOpacity: 0.8
            });
        },
        onEachFeature: (feature, layer) => {
            // Giving each feature a popup with information that's relevant to it
            layer.bindPopup(`
                <strong>${feature.properties.place}</strong><br>
                Magnitude: ${feature.properties.mag}<br>
                Depth: ${feature.geometry.coordinates[2]} km<br>
            `);
        }
    }).addTo(myMap);

    // Set up the legend
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
        let div = L.DomUtil.create("div", "info legend");
        let depths = [-10, 10, 30, 50, 70, 90];
        let colors = ["#7fff00", "#adff2f", "#ffd700", "#ff8c00", "#ff4500", "#ff0000"];

        // Set background color to white
        div.style.backgroundColor = "white"; 
        // Add padding
        div.style.padding = "10px"; 
        div.style.borderRadius = "5px";

        // Loop through the depth intervals and create a label with a colored square for each
        for (let i = 0; i < depths.length; i++) {
            // Create a colored box and the corresponding depth label
            div.innerHTML +=
                '<div style="display: flex; align-items: center;">' + // Flexbox for alignment
                '<div style="background:' + colors[i] + '; width: 20px; height: 20px; margin-right: 5px;"></div>' + // Colored box
                depths[i] + (depths[i + 1] ? ' &ndash; ' + depths[i + 1] + ' km' : ' + km') + // Depth label
                '</div>'; // Closing the flex container
        }

        return div;
    };

    // Adding the legend to the map
    legend.addTo(myMap);
});
