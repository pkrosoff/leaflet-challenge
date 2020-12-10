const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson"
const API_KEY = "pk.eyJ1IjoicGtyb3NvZmYiLCJhIjoiY2tnZHcydm5lMDhhajJ5cGF0bWZ5djVuNCJ9.HE5-gKOKsb4LWwjYY5kOMA"


// var myMap = L.map("map", {
//     center: [37.0902, -95.7129],
//     zoom: 4
//   });

// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
// attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
// tileSize: 512,
// maxZoom: 18,
// zoomOffset: -1,
// id: "mapbox/outdoors-v11",
// accessToken: API_KEY
// }).addTo(myMap);


// d3.json(queryURL).then(data => {
//     console.log(data)
    
//     L.geoJson(data).addTo(myMap)
    
//     })

d3.json(queryUrl).then(data => {
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h4> Magnitude: " + feature.properties.mag + "<br>" +
      "Depth: " + feature.geometry.coordinates[2] + "<br>" + "Location: " + feature.properties.place + "</h4>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
  });

  var mags = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

L.geoJSON(mags, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, mags);
    }
}).addTo(map);
  // var mags = L.geoJSON(earthquakeData, {
  //   onEachFeature: onEachFeature,
  //   pointToLayer: (feature, latlng) => {
  //     return new L.circleMarker(latlng, {
  //       radius: feature.properties.mag*20000,
  //       fillColor: "red",
  //       stroke: false 
  //     });
  //   }
  // });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    // Magnitudes: mags
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

    

//     Import & Visualize the Data
// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.


// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


// HINT the depth of the earth can be found as the third coordinate for each earthquake.


// Include popups that provide additional information about the earthquake when a marker is clicked.


// Create a legend that will provide context for your map data.


// Your visualization should look something like the map above.