let myMap = L.map("map", {
  center: [35.96044, -90.30695],
  zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let geoData2 = "data/georef-united-states-of-america-county-millesime.geojson"
let usdaData2 = "data/usda_data.json"
let geojson2;

// // Get the data with d3.
// d3.json(geoData2).then(function(data) {
//   // console.log(data)
//   // Create a new choropleth layer.
//   geojson2 = L.choropleth(data, {

//     // Define which property in the features to using a function for a separate data source.
//     valueProperty: function(feature) {
//         return usdaData2.filter(item => item.FIPS = feature.properties.FIPS)[0].Population_Estimate_2018
//     } ,
    
    
//     // // Define which property in the features to use.
//     // valueProperty: "CENSUSAREA",
//     scale: ["#ffffb2", "#b10026"],
//     steps: 10,
//     mode: "q",
//     style: {
//       // Border color
//       color: "#000000",
//       weight: 1,
//       fillOpacity: 0.8
//     },

//     // Binding a popup to each layer
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(`<strong> ${feature.properties.COUNTY}, ${feature.properties.STATE}</strong>`);
//     }
//   }).addTo(myMap);
// });