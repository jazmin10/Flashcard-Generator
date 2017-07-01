/* ASSIGNMENT #11: FLASHCARD-GENERATOR */

var inquirer = require("inquirer");

var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");

var fs = require("fs");

// var first = new BasicCard("Who is the first president of the US?", "Geogie");
// console.log(first);
// console.log(first.front);
// console.log(first.back);


inquirer.prompt([{
	type: "list",
	name: "introAction",
	message: "Welcome, pick an action: ",
	choices: ["Create a Basic Card", "Create a Cloze Card", "Review existing cards"]
}]).then(function(answers){
	// console.log(answers);
	switch (answers.introAction) {
		case "Create a Basic Card":
			createBasicCard();
			break;
		case "Create a Cloze Card":
			createClozeCard();
			break;
		case "Review existing cards":
			basicCardList();
			break;
	}
});

function createBasicCard(){
	inquirer.prompt([{
		type: "input",
		name: "basicFront",
		message: "Enter the front of the card: "
	}, {
		type: "input",
		name: "basicBack",
		message: "Enter the back of the card: "
	}]).then(function(basicAnswers){
		// console.log(basicAnswers);
		// console.log(basicAnswers.basicFront, basicAnswers.basicBack);

		var front = basicAnswers.basicFront;
		var back = basicAnswers.basicBack;
		var basicFlashcard = new BasicCard(front, back);
		// console.log(basicFlashcard);
		// console.log(basicFlashcard.front, basicFlashcard.back);

		// appendBasicLog(front, back);
		appendBasicLog(basicFlashcard);

		// restartBasicInput();
	});
}

function createClozeCard(){
	inquirer.prompt([{
		type: "input",
		name: "clozeFull",
		message: "Enter the full text of the card: "
	}, {
		type: "input",
		name: "clozePartial",
		message: "Enter the partial text of the card: "
	}]).then(function(basicAnswers){
		console.log(basicAnswers);
		// console.log(basicAnswers.clozeFull, basicAnswers.clozePartial);

		var fullText = basicAnswers.clozeFull;
		var clozeText = basicAnswers.clozePartial;
		console.log(fullText, clozeText);

		var clozeObject = new ClozeCard(fullText, clozeText);
		console.log(clozeObject);
		var partialText = clozeObject.partial();
		console.log("Partial: " + partialText);
		console.log(clozeObject.partialText);
	});

}

function restartBasicInput(){
	inquirer.prompt([{
		type: "confirm",
		name: "confirmRestartBasic",
		message: "Would you like to enter another basic card?"
	}]).then(function(restartBasicInput){
		console.log(restartBasicInput);
		console.log(restartBasicInput.confirmRestartBasic)

		if (restartBasicInput.confirmRestartBasic){
			createBasicCard();
		}
		else{
			console.log("Thank you!");
		}
	});
}

function appendBasicLog(basicFlashcard){
	// console.log(front, back);

	// I am using ;! and ;* to be able to distinguish a card from another, as well as front and back
	// var appendText = "\n" + front + " ;! " + back + " ;*";
	var appendText = JSON.stringify(basicFlashcard) + ";";

	fs.appendFile("./basicLog.txt", appendText, function(error){
		if (error){
			console.log(error);
		}
		else {
			console.log("A basic card was added!");
			restartBasicInput();
		}
	});
}

function basicCardList(){
	fs.readFile("./basicLog.txt", "utf8", function(error, basicCards){
		if (error){
			console.log(error);
		}
		else {
			// console.log(basicCards);

			var basicList = basicCards.split(";");
			// console.log(basicList);

			for (var i = 0; i < (basicList.length - 1); i++){
				var basicObject = JSON.parse(basicList[i]);
				// console.log(basicObject);
				console.log(basicObject.front, basicObject.back);						// console.log(basicList[i].front);
			}
		}
	});
}
