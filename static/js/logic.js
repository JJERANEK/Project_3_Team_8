

// Use this link to get the GeoJSON data.
let geoData = "data/counties.fips.geojson";
let usda_data = "data/usda_data.json";
let filenames = [geoData, usda_data];


// FUNCTION #1 of 4 - Create initial charts and read in JSON data
function buildCharts(FIPS) {


    // Read in the JSON data
    d3.json(usda_data).then((data => {
        // let county = data[0]
        // Define variables
        // let samples = data.samples
        // let metadata = data.metadata
        let filteredData = data.filter(item => item.FIPS == FIPS)[0]
  
        // Filter by patient ID
        // let filteredSample = samples.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]
  
        // Create variables for chart
        // Grab sample_values for the bar chart
        let barchartdata = [filteredData.Fast_Food_Restaurants, filteredData.Grocery_Stores, filteredData.Farmers_Markets]
  
        // Use otu_ids as the labels for bar chart
        let barchartlabel = ["Fast Food", "Grocery Stores", "Farmer's Markets"]
  
        // // use otu_labels as the hovertext for bar chart
        // let otu_labels = filteredSample.otu_labels
  
        // BAR CHART
        // Create the trace
        let bar_data = [{
            // Use otu_ids for the x values
            y: barchartdata,
            // Use sample_values for the y values
            x: barchartlabel,
            // // Use otu_labels for the text values
            // text: otu_labels.slice(0, 10).reverse(),
            type: 'bar',
            // orientation: 'h',
            marker: {
                color: 'rgb(28, 145, 88)'
            },
        }]
  
  
  
  
        // Define plot layout
        let bar_layout = {
            title: `${filteredData.County}, ${filteredData.State}`,
            xaxis: { title: "Number of Locations", "autorange": true},
            paper_bgcolor:"black",
            font: {color:'#ffffff'}
        }
  
        // Display plot
        Plotly.newPlot('bar', bar_data, bar_layout)
  
  
        // GAUGE CHART
        // Create variable for washing frequency
        let obesity = filteredData['Obesity_(%)']
  
        // Create the trace
        let gauge_data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: obesity,
                title: { text: "Obesity Percentage for the State" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    bar: {color: 'cornflowerblue'},
                    axis: { range: [null, 100] },
                    steps: [
                        { range: [0, 33], color: 'rgb(193, 245, 220)' },
                        { range: [33, 66], color: 'rgb(86, 186, 138)' },
                        { range: [66, 100], color: 'rgb(17, 115, 68)' },
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
  
  
  // FUNCTION #2 of 4 - Populate the Demographic Info box
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
  
  // FUNCTION #3 of 4 - Changes what is shown dependent on ID selection
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
        // }
        // console.log(FIPS);
        // FIPS_Num.forEach(FIPS => {
            dropdown.append("option").text(data[i].FIPS).property("value", data[i].FIPS)
        }
        buildCharts(FIPS_Nums[0]);
        populateDemoInfo(FIPS_Nums[0]);
    })};

  
  initDashboard();

  let granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'left-right',
    isPausedWhenNotInView: true,
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