//Load Sample Pictures
const mnist = require('mnist'); 

//Create a training set of 700 pictures and 20 test pictures
const set = mnist.set(700, 20);

//Define training and test set
const trainingSet = set.training;
const testSet = set.test;


//Load synaptic library
const synaptic = require('synaptic');

//Define layers, networks and trainers
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;

//Create input (784), hidden (100), and output layer (10)
const inputLayer = new Layer(784);
const hiddenLayer = new Layer(100);
const outputLayer = new Layer(10);

//Connect the input layer to the hidden layer, and the hidden layer to output 
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

//Create neural network named myNetwork
const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

//Create trainer and define it's parameters
const trainer = new Trainer(myNetwork);
trainer.train(trainingSet, {
    rate: .2,
    iterations: 20,
    error: .1,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.CROSS_ENTROPY
});

//Compare results of predicted test set 0 to actual value of test set 0
console.log(myNetwork.activate(testSet[0].input));
console.log(testSet[0].output);
