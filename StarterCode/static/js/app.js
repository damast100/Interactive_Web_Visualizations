const file = "./samples.json"

function chart(each) {
 d3.json(file).then((data) => {
	var plotting = data.samples;
	var subject = plotting.filter((sample) => sample.id === each)[0];
	console.log(subject)})};