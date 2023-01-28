let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding the tile layer
let Base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Fetch GeoJSON and data to join to it
$.when(
  $.getJSON("data/counties.fips.geojson"),
  $.getJSON("https://project-3-team-8.onrender.com/api/v1.0/usda_data")
  ).done(function (responseGeojson, responseData) {
    var data = responseData[0]
    var DATAHOLDER = responseGeojson[0]
    // Create hash table for easy reference
    var dataHash = data.reduce(function (hash, item) {
      if (parseInt(item.FIPS)) {
        hash[parseInt(item.FIPS)] = item
      }
      return hash
    }, {})
    // Add value from hash table to geojson properties
DATAHOLDER.features.forEach(function (item) {
      item.properties = dataHash[parseInt(item.properties.FIPS)] || null
    })
//console.log(geojson.features.filter(item => item.properties.FIPS==1001))
    //item.properties.USDA.FIPS
    console.log(DATAHOLDER)
    //console.log(item.properties.USDA.Grocery_Stores)
gs=[]
for (var i = 0; i < DATAHOLDER.features.length; i++){
  try{
gs.push(DATAHOLDER.features[i].properties.USDA['Grocery_Stores'])
  }
catch(TypeError){
gs.push(0)}
}
DATAHOLDER.features=DATAHOLDER.features.filter(feature=> feature.properties)
//geojson.features[0]
console.log(DATAHOLDER)
//console.log(gs)
console.log(DATAHOLDER.features[1].properties)
    let obesitylayer = L.choropleth(DATAHOLDER, {
      valueProperty:function(feature){
        console.log(feature)
        return feature.properties.Obesity}
     ,
      scale: ["#F7FCFD", "#4D004B"],
      steps: 6,
      mode: "q",
      style: {
        // Border color
        color: "#000000",
        weight: 1,
        fillOpacity: 0.8
      },
          // This is called on each feature.
    onEachFeature: function(feature, layer) {
      console.log(feature);
      let FIPS_Num = feature.properties.FIPS;
      let CountyData = feature.properties.County;
      let StateData = feature.properties.State;
      let PopData = feature.properties.Population_Estimate_2018
      let FFRData = feature.properties.Fast_Food_Restaurants
      let GroceryData = feature.properties.Grocery_Stores
      let FMData = feature.properties.Farmers_Markets
      // Set the mouse events to change the map styling.
      layer.on({

        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
          optionChanged(FIPS_Num);
        }
        
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + CountyData + ", " + StateData + "</h1><hr><h4> Population: " + PopData + "</h4><hr><h4> Fast Food Restaurants: " + 
        FFRData + "</h4><hr><h4> Grocery Stores: " + GroceryData + "</h4><hr><h4> Farmers Markets: " + FMData + "</h4>");

    }

    }).addTo(myMap)

    // FAST FOOD LAYER
    let fast_food_layer = L.choropleth(DATAHOLDER, {
      valueProperty:function(feature){
        console.log(feature)
        return feature.properties.Fast_Food_Restaurants}
     ,
      scale: ["#F7FCFD", "#4D004B"],
      steps: 6,
      mode: "q",
      style: {
        // Border color
        color: "#000000",
        weight: 1,
        fillOpacity: 0.8
      },
          // This is called on each feature.
    onEachFeature: function(feature, layer) {
      console.log(feature);
      let FIPS_Num = feature.properties.FIPS;
      let CountyData = feature.properties.County;
      let StateData = feature.properties.State;
      let PopData = feature.properties.Population_Estimate_2018
      let FFRData = feature.properties.Fast_Food_Restaurants
      let GroceryData = feature.properties.Grocery_Stores
      let FMData = feature.properties.Farmers_Markets
      // Set the mouse events to change the map styling.
      layer.on({
        
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
          optionChanged(FIPS_Num);
        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + CountyData + ", " + StateData + "</h1><hr><h4> Population: " + PopData + "</h4><hr><h4> Fast Food Restaurants: " + 
        FFRData + "</h4><hr><h4> Grocery Stores: " + GroceryData + "</h4><hr><h4> Farmers Markets: " + FMData + "</h4>");

    }

    });

    // GROCERY STORE LAYER
    let grocery_layer = L.choropleth(DATAHOLDER, {
      valueProperty:function(feature){
        console.log(feature)
        return feature.properties.Grocery_Stores}
     ,
      scale: ["#F7FCFD", "#4D004B"],
      steps: 6,
      mode: "q",
      style: {
        // Border color
        color: "#000000",
        weight: 1,
        fillOpacity: 0.8
      },
          // This is called on each feature.
    onEachFeature: function(feature, layer) {
      console.log(feature);
      let FIPS_Num = feature.properties.FIPS;
      let CountyData = feature.properties.County;
      let StateData = feature.properties.State;
      let PopData = feature.properties.Population_Estimate_2018
      let FFRData = feature.properties.Fast_Food_Restaurants
      let GroceryData = feature.properties.Grocery_Stores
      let FMData = feature.properties.Farmers_Markets
      // Set the mouse events to change the map styling.
      layer.on({
        
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
          optionChanged(FIPS_Num);
        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + CountyData + ", " + StateData + "</h1><hr><h4> Population: " + PopData + "</h4><hr><h4> Fast Food Restaurants: " + 
        FFRData + "</h4><hr><h4> Grocery Stores: " + GroceryData + "</h4><hr><h4> Farmers Markets: " + FMData + "</h4>");

    }

    });

    // FARMERS MARKETS LAYER
    let farmers_markets_layer = L.choropleth(DATAHOLDER, {
      valueProperty:function(feature){
        console.log(feature)
        return feature.properties.Farmers_Markets}
     ,
      scale: ["#F7FCFD", "#4D004B"],
      steps: 6,
      mode: "q",
      style: {
        // Border color
        color: "#000000",
        weight: 1,
        fillOpacity: 0.8
      },
          // This is called on each feature.
    onEachFeature: function(feature, layer) {
      console.log(feature);
      let FIPS_Num = feature.properties.FIPS;
      let CountyData = feature.properties.County;
      let StateData = feature.properties.State;
      let PopData = feature.properties.Population_Estimate_2018
      let FFRData = feature.properties.Fast_Food_Restaurants
      let GroceryData = feature.properties.Grocery_Stores
      let FMData = feature.properties.Farmers_Markets
      // Set the mouse events to change the map styling.
      layer.on({
        
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
          optionChanged(FIPS_Num);
        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + CountyData + ", " + StateData + "</h1><hr><h4> Population: " + PopData + "</h4><hr><h4> Fast Food Restaurants: " + 
        FFRData + "</h4><hr><h4> Grocery Stores: " + GroceryData + "</h4><hr><h4> Farmers Markets: " + FMData + "</h4>");

    }

    });

  let baseMaps = {
    "Obesity": obesitylayer,
    "Fast Food": fast_food_layer,
    "Grocery Stores": grocery_layer,
    "Farmers Markets": farmers_markets_layer
  };

  L.control.layers(baseMaps).addTo(myMap)


  /*Legend*/
  let legend = L.control({ position: 'bottomright' });
  legend.onAdd = function (myMap) {
    let div = L.DomUtil.create('div', 'info legend')
    let colors = obesitylayer.options.colors
    let labels = []

    /* Add min & max*/
    div.innerHTML = '<div class="labels"><div class="min">Low</div> \
      <div class="max">High</div></div>'

    for (i = 1; i < colors.length; i++) {
      labels.push('<li style="background-color: ' + colors[i] + '"></li>')
    }

    div.innerHTML += '<ul style="list-style-type:none;display:flex">' + labels.join('') + '</ul>'
    return div
  }

  legend.addTo(myMap);

});