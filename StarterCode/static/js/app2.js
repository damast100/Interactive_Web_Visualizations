function charts(each) {
 d3.json("samples.json").then((data) => {
  var samples = data.samples;
  var resultsArray = samples.filter(sampleobject => sampleobject.id === each);
  var result = resultsArray[0]

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;

// Build a bubble chart 

  var layoutBubble = {
    xaxis: { title: "OTU ID" },
    hovermode:"closest",
    margin: { t: 3 },
    };

  var bubble = [ 
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.newPlot("bubble", bubble, layoutBubble);

// Build a bar chart

  var bar_data = [
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"
    }
  ];

  var barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    hovermode:"closest"
  };

  Plotly.newPlot("bar", bar_data, barLayout);
});
}

function metaData(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultsArray = metadata.filter(sampleobject => sampleobject.id == sample);
    var result = resultsArray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

function init() {
 var selector = d3.select("#selDataset");
 d3.json("samples.json").then((data) => {
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // Using the first sample to build initial visualizations
  const first = sampleNames[0];
  charts(first);
  metaData(first);
});
}

// Creating a new function to gather the information for each new sample selected
function optionChanged(newSample) {
charts(newSample);
metaData(newSample);
};

init();