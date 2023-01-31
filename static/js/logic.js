

// Use this link to get the GeoJSON data.
let geoData = "data/counties.fips.geojson";
let usda_data = "https://project-3-team-8.onrender.com/api/v1.0/usda_data";
let filenames = [geoData, usda_data];


// FUNCTION #1 of 4 - Create initial charts and read in JSON data
function buildCharts(FIPS) {


    // Read in the JSON data
    d3.json(usda_data).then((data => {

        let filteredData = data.filter(item => item.FIPS == FIPS)[0]

        let barchartdata = [filteredData.Fast_Food_Restaurants_Per_1000_of_Population, filteredData.Grocery_Stores_Per_1000_of_Population, filteredData.Farmers_Markets_Per_1000_of_Population]
  
        let barchartlabel = ["Fast Food", "Grocery Stores", "Farmer's Markets"]
  
  
        // BAR CHART
        // Create the trace
        let bar_data = [{
            y: barchartdata,
            x: barchartlabel,
            type: 'bar',
            // orientation: 'h',
            marker: {
                color: 'rgb(33, 40, 166)'
            },
        }]
  
  
  
  
        // Define plot layout
        let bar_layout = {
            title: `Establishments Per 1,000 Residents<br>${filteredData.County}, ${filteredData.State}`,
            xaxis: { title: "Number of Locations", "autorange": true},
            paper_bgcolor:"black",
            font: {color:'#ffffff'}
        }
  
        // Display plot
        Plotly.newPlot('bar', bar_data, bar_layout)
  
  
        // GAUGE CHART
        // Create variable for washing frequency
        let obesity = filteredData['Obesity']
  
        // Create the trace
        let gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: obesity,
                number: {'suffix': "%"},
                title: { text: "Obesity for the State" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: {color: 'rgb(33, 40, 166)'},
                    axis: { range: [null, 100] },
                    steps: [
                        { range: [0, 33], color: 'rgb(26, 107, 28)' },
                        { range: [33, 66], color: 'rgb(208, 217, 43)' },
                        { range: [66, 100], color: 'rgb(107, 4, 4)' },
                    ],
                }
            }
        ];
  
        // Define Plot layout
        let gauge_layout = { width: 600, height: 500, margin: { t: 0, b: 0 }, paper_bgcolor:"black", font: {color:'#ffffff'} };
  
        // Display plot
        Plotly.newPlot('gauge', gauge_data, gauge_layout);
    }))
  
  
  };
  
  
  // FUNCTION #2 of 4 - Populate the County Data box
  function populateDemoInfo(FIPS) {
  
    let demographicInfoBox = d3.select("#sample-metadata");
  
    demographicInfoBox.html(" ")
  
    d3.json(usda_data).then(data => {
        // let metadata = data.metadata
        let filteredData = data.filter(item => item.FIPS == FIPS)[0]
        // let county = data[0]
        console.log(filteredData)
        Object.entries(filteredData).forEach(([key, value]) => {
            demographicInfoBox.append("p").text(`${key}: ${value}`)
        })
  
  
    })
  }
  
  // FUNCTION #3 of 4 - Changes what is shown dependent on click selection
  function optionChanged(FIPS) {
    console.log(FIPS);
    buildCharts(FIPS);
    populateDemoInfo(FIPS);
  }
  
  // FUNCTION #4 of 4 - Sets up the dashboard
  function initDashboard() {
    let dropdown = d3.select("#selDataset")
    d3.json(usda_data).then(data => {
        let FIPS_Nums = [];
        for (let i = 0; i < data.length; i++) {
            FIPS_Nums.push(data[i].FIPS)
            dropdown.append("option").text(data[i].FIPS).property("value", data[i].FIPS)
        }
        buildCharts(FIPS_Nums[0]);
        populateDemoInfo(FIPS_Nums[0]);
    })};

  
  initDashboard();


  // Granim footer
  let granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: false,
    states : {
        "default-state": {
            gradients: [
                ['#ff9966', '#ff5e62'],
                ['#00F260', '#0575E6'],
                ['#e1eec3', '#f05053']
            ]
        }
    }
});