/* -------------------- LOGIC -------------------- */

/**
 * Loads mnist model
 * @return mnist model
 */
 var brain = require('brain');
 var colorModel = require('./createColorModel');
 
 var getRandomColor = function() {
 	var letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
 };
 
function trainColorModel() {
	window.colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white'];
	var trainingSet = [];
	var color = getRandomColor();
	
	$('.color-square').css('background-color', color);
	$('.input-btn').click(function(event) {
		var selected = $('.input-color').val();
		console.log('VALUE ', selected);
		selected = parseInt(selected);
		console.log('parsed value', selected);
		trainingSet.push({input: color, output: selected})
		color = getRandomColor();
		$('.color-square').css('background-color', color);
		console.log(trainingSet);
	});
	
	$('.end-train-btn').click(function(event) {
		$('.input-color').css('display', 'none');
		$('.input-btn').css('display', 'none');
		$('.end-train-btn').css('display', 'none');
		$('.next-btn').text('What is the color?');
		return trainingSet;
	});
}

/**
 * Gets index of largest value in an array
 * @param arr Array to extract largest value index out of
 * @return The index of the largest value in the array
 */
function getLargestValueInIndex(arr) {
	var largestIndex = -1;
	var largestValue = -Infinity;

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] > largestValue) {
			largestValue = arr[i];
			largestIndex = i;
		}
	}
	return largestIndex;
}

/**
 * Gets random mnist digit
 * @return random mnist digit as a 1D array
 */
function getRandomColorDigit() {
	return Math.floor(Math.random() * window.colors.length);
}

/**
 * renders an mnist digit on the dom
 * @param mnistDigit: a 1D 28 * 28 array representing an mnist number
 */
function renderMnistDigit(mnistDigit) {
	var mnistGrid = $('.mnist-grid');
	mnistGrid.empty();

	for (var i = 0; i < 28; i++) {
		var row = $('<div>', {
			'class': 'mnist-row',
		});

		for (var j = 0; j < 28; j++) {

			var cell = $('<div>', {
				class: 'mnist-cell',
				css: {
					'opacity': mnistDigit[28 * i + j],
				}
			});

			row.append(cell);
		}

		mnistGrid.append(row);
	}
}

/* -------------------- CONTROLLERS -------------------- */

/* Gets a new mnist digit and predicts on it */
function getNewAiColor() {
	var digit = getRandomColorDigit();
	

	var oneHotVector = net.run(digit).map(function (score) {
		return score.toFixed(4); // cull to 4 decimal places
	});

  $('.guess-ai').text(getLargestValueInIndex(oneHotVector));
	$('.mnist-one-hot-vector').text('[ ' + oneHotVector.join(' , ') + ' ]');
}

/* -------------------- INITIALIZATION -------------------- */

$(document).ready(function() {
	var trainingSet = trainColorModel();
	colorModel.createColorModel(trainingSet);
	
	$('.next-btn').click(function(event) {
		color = getRandomColor();
		$('.color-square').css('background-color', color);
		$('.guess-ai').text(getNewAiColor());
	});
});