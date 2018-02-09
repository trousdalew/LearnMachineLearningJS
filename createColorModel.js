var brain = require('brain'); // Machine learning
var fs = require('fs');       // file reading / writing

console.log('createColorModel loaded');

exports.createColorModel = function(trainingSet) {
  var net = new brain.NeuralNetwork();
    net.fromJSON(JSON.parse(neuralnet));
    window.net = net;
    var iterations = trainingSet.length;

// creating a simple feed-forward neural network
  net.train(trainingSet, {
    iterations: iterations,
    log: true,
    logPeriod: 1,
    learningRate: 0.1,
  });

  //litmus test for quality of model
  var output = net.run(testingSet[0].input);
  console.log(output);

  // get model ready for writing to file
  var model = JSON.stringify(net.toJSON());
  var modelString = 'neuralnet = \'' + model + '\';';

  // save model to file
  fs.writeFile('./color-model.json', modelString, 'utf8', function(error) {
    if (error) {
      console.error(error);
    }
    console.log('model saved!');
  });

};
