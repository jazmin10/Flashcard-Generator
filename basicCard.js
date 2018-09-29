/* FLASHCARD-GENERATOR
Simply run node main.js on the command line and you will be prompted to either:
Create a Basic Card
Create a Cloze Card
Review Existing Cards */

// BasicCard Constructor
var BasicCard = function(front, back){
	this.front = front;
	this.back = back;
}

// Export BasicCard Constructor
module.exports = BasicCard;