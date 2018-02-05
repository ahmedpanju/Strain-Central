var synaptic = require('synaptic'); // this line is not needed in the browser
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

//Each spot in the input array represents a different symptom, and 1 represents the activation of a certain symptom. The output is organized as a 2 bit binary system

var trainingSet = [
    {
        input: [1,0,0],
        output: [0,0]
    }, 
    {
        input: [0,1,0],
        output: [0,1]
    },
    {
        input: [0,0,1],
        output: [1,1]
    }
]



function Perceptron(input, hidden, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var hiddenLayer = new Layer(hidden);
	var outputLayer = new Layer(output);

	// connect the layers
	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});
}

// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

var myPerceptron = new Perceptron(3,2,2);

const trainer = new Trainer(myPerceptron);
trainer.train(trainingSet, {
    rate: .2,
    iterations: 10000,
    error: .0005,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
});

console.log(myPerceptron.activate([0,0,1]));
