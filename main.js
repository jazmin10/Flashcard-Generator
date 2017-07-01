/* ASSIGNMENT #11: FLASHCARD-GENERATOR */

// GLOBAL VARIABLES ===========================================================
var inquirer = require("inquirer");
var fs = require("fs");


var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");


// BASIC CARD FUNCTIONS ===========================================================

// Prompts the user to create front and back of a basic card and then appends
// answers to a .txt file
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
		
		var front = basicAnswers.basicFront;
		var back = basicAnswers.basicBack;
		var basicFlashcard = new BasicCard(front, back); // Create a constructor
		
		// Record the answers in a .txt file
		appendBasicLog(basicFlashcard);
	});
}

// Push BasicCard variables instances to the basicLog.txt file and then asks
// user if they like to enter a a new card 
function appendBasicLog(basicFlashcard){
	var appendText = JSON.stringify(basicFlashcard, null, 2) + ";"; // Text we will be appending

	fs.appendFile("./basicLog.txt", appendText, function(error){
		if (error) {
			console.log(error);
		}
		else {
			console.log("A basic card was added!");

			// Prompt the user to other if they would like to enter a card
			restartBasicInput();
		}
	});
}

// Asks user if they would like to enter another basic card
// If they do: it prompts the user to enter new basic card information
// If they don't: it asks the user if they want to return to the Main Menu
function restartBasicInput(){
	inquirer.prompt([{
		type: "confirm",
		name: "confirmRestartBasic",
		message: "Would you like to enter another basic card?"
	}]).then(function(restartBasicInput){
		if (restartBasicInput.confirmRestartBasic) {
			createBasicCard();
		}
		else {
			// If "no", the user is asked if they would like to review existing
			// cards or return to the the main menu
			inquirer.prompt([{
				type: "confirm",
				name: "confirmReviewCards",
				message: "Would you like to review cards?"
			}]).then(function(confirmReview){
				if (confirmReview.confirmReviewCards) {
					reviewCards();
				}
				else {
					restartMainMenu();
				}
			});
		}
	});
}

// Reads the basicLog.txt file, shows the front of the cards as list options, and
// when an option is selected, the user will see the back of the card
function basicCardList(){
	fs.readFile("./basicLog.txt", "utf8", function(error, basicCards){
		if (error){
			console.log(error);
		}
		else {
			var basicList = basicCards.split(";");
			var frontArr = [];
			var backArr = [];

			// I couldn't figure out why the last index of the array is blank
			// It comes out as [index0, index1, ... , lastIndex === '']
			// For-Loop: push front and back of the cards to seperate arrays
			for (var i = 0; i < (basicList.length - 1); i++) {
				var basicObject = JSON.parse(basicList[i]);
				var frontOptions = frontArr.push(basicObject.front);
				var backAnswers = backArr.push(basicObject.back);
			}

			// Once the user makes a selection, they will see the back of the card and
			// get asked if they want to see the list of basic cards again
			inquirer.prompt([{
				type: "list",
				name: "frontQuestions",
				message: "When you are ready for an answer, select a card: ",
				choices: frontArr // Display the front of the cards as options
			}]).then(function(frontSelection){
				var questionIndex = frontArr.indexOf(frontSelection.frontQuestions);
				console.log("Answer: " + backArr[questionIndex]);
				restartBasicList();
			});
		}
	});
}

// Prompts the user to see the list of basic cards again
// If they do: they return to the list
// If they don't: user gets asked if they wish to return to the Main Menu Options
function restartBasicList(){
	inquirer.prompt([{
		type: "confirm",
		name: "restartBasicList",
		message: "Would you like to view another basic card?"
	}]).then(function(restartBasicList){
		if (restartBasicList.restartBasicList) {
			basicCardList();
		}
		else {
			restartMainMenu();
		}
	});
}

// CLOZE CARD FUNCTIONS ===========================================================

function createClozeCard(){
	inquirer.prompt([{
		type: "input",
		name: "clozeFull",
		message: "Enter the full text of the card: "
	}, {
		type: "input",
		name: "clozeCloze",
		message: "Enter the cloze text of the card: "
	}]).then(function(clozeAnswers){
		var fullText = clozeAnswers.clozeFull;
		var clozeText = clozeAnswers.clozeCloze;
		
		// Create a ClozeCard variable instance 
		var clozeFlashcard = new ClozeCard(fullText, clozeText);
		
		// Determine if the cloze deletion does not appear in the input text
		// If it does appear, append input to a .txt file
		// If it doesn't appear, log the error and prompt the user to enter the
		// information again
		var partialText = clozeFlashcard.partial();

		if (partialText === "Cloze text not found") {
			console.log(partialText + "\nTry again!");
			createClozeCard();
		}
		else {
			// Record the answers in a .txt file
			appendClozeLog(clozeFlashcard);
		}
	});
}

// Push ClozeCard variables instances to the clozeLog.txt file and then asks
// user if they like to enter a a new card 
function appendClozeLog(clozeFlashcard){
	var appendClozeText = JSON.stringify(clozeFlashcard, null, 2) + ";"; // Text we will be appending

	fs.appendFile("./clozeLog.txt", appendClozeText, function(error){
		if (error) {
			console.log(error);
		}
		else {
			console.log("A cloze card was added!");

			// Prompt the user to other if they would like to enter a card
			restartClozeInput();
		}
	});
}

// Asks user if they would like to enter another basic card
// If they do: it prompts the user to enter new basic card information
// If they don't: it asks the user if they want to return to the Main Menu
function restartClozeInput(){
	inquirer.prompt([{
		type: "confirm",
		name: "confirmRestartCloze",
		message: "Would you like to enter another cloze card?"
	}]).then(function(restartClozeInput){
		if (restartClozeInput.confirmRestartCloze) {
			createClozeCard();
		}
		else {
			// If "no", the user is asked if they would like to review existing
			// cards or return to the the main menu
			inquirer.prompt([{
				type: "confirm",
				name: "confirmReviewCards",
				message: "Would you like to review cards?"
			}]).then(function(confirmReview){
				if (confirmReview.confirmReviewCards) {
					reviewCards();
				}
				else {
					restartMainMenu();
				}
			});
		}
	});
}

// Reads the clozeLog.txt file, shows the partial text as list options, and
// when an option is selected, the user will see the full text
function clozeCardList(){
	fs.readFile("./clozeLog.txt", "utf8", function(error, clozeCards){
		if (error){
			console.log(error);
		}
		else {
			var clozeList = clozeCards.split(";");
			var clozeArr = [];
			var partialArr = [];
			var fullArr = [];

			// I couldn't figure out why the last index of the array is blank
			// It comes out as [index0, index1, ... , lastIndex === '']
			// For-Loop: push partial and full text to seperate arrays
			for (var j = 0; j < (clozeList.length - 1); j++){
				var clozeObject = JSON.parse(clozeList[j]);
				var text = clozeObject.text;
				var cloze = clozeObject.cloze;
				
				// Create a new variable instance for each card so that we can grab
				// the partial text
				var clozeCardObject = new ClozeCard(text, cloze);
				var clozePartialText = clozeCardObject.partial();

				partialArr.push(clozePartialText);
				fullArr.push(text);
			}

			// Once the user makes a selection, they will see the full text and
			// get asked if they want to see the list of cloze cards again
			inquirer.prompt([{
				type: "list",
				name: "partialQuestions",
				message: "When you are ready for an answer, select a card: ",
				choices: partialArr // Display partial text as list of options
			}]).then(function(clozeChoice){
				var cardIndex = partialArr.indexOf(clozeChoice.partialQuestions);
				console.log("Answer: " + fullArr[cardIndex]);
				restartClozeList();
			});
		}
	});
}

// Prompts the user to see the list of cloze cards again
// If they do: they return to the list
// If they don't: user gets asked if they wish to return to the Main Menu Options
function restartClozeList(){
	inquirer.prompt([{
		type: "confirm",
		name: "restartClozeList",
		message: "Would you like to view another cloze card?"
	}]).then(function(restartClozeList){

		if (restartClozeList.restartClozeList) {
			clozeCardList();
		}
		else {
			restartMainMenu();
		}
	});
}

// BASIC/CLOZE FUNCTIONS ===========================================================

// Prompts user to select a deck of cards to review: basic or cloze
function reviewCards(){
	inquirer.prompt([{
		type: "list",
		name: "reviewDeck",
		message: "Which deck of cards would you like to review?",
		choices: ["Basic Cards", "Cloze Cards"]
	}]).then(function(reviewAnswers){
		switch (reviewAnswers.reviewDeck) {
			case "Basic Cards":
				basicCardList();
				break;
			case "Cloze Cards":
				clozeCardList();
		}
	});
}

// Aks user if they want to return to the main menu or end the application
function restartMainMenu(){
	inquirer.prompt([{
		type: "confirm",
		name: "restartAnswer",
		message: "Back to main menu?"
	}]).then(function(restartMainOptions){
		if (restartMainOptions.restartAnswer) {
			mainMenu();
		}
		else {
			console.log("Good bye!");
		}
	});
}

// MAIN PROCESS ===========================================================

// Displays Main Menu Options: Create a Basic Card, Create a Cloze Card
// and Review Existing Cards
function mainMenu(){
	inquirer.prompt([{
		type: "list",
		name: "introAction",
		message: "Welcome, pick an action: ",
		choices: ["Create a Basic Card", "Create a Cloze Card", "Review Existing Cards"]
	}]).then(function(answers){
		switch (answers.introAction) {
			case "Create a Basic Card":
				createBasicCard();
				break;
			case "Create a Cloze Card":
				createClozeCard();
				break;
			case "Review Existing Cards":
				reviewCards();
				break;
		}
	});
}

mainMenu();


