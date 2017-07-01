/* ASSIGNMENT #11: FLASHCARD-GENERATOR */

// ClozeCard constructor
var ClozeCard = function(text, cloze){
	this.text = text;
	this.cloze = cloze;
}

// Adds partial() method to the ClozeCard's prototype
ClozeCard.prototype.partial = function(){
	var fullText = this.text.toLowerCase();
	var clozeText = this.cloze.toLowerCase();

	var search = fullText.search(clozeText);

	// If cloze deletion does not appear then return 'Cloze text not found'
	// Otherwise, adds partialText property to the Cloze Card's prototype
	if (search === -1) {
		return "Cloze text not found";
	}
	else {
		var partialText = fullText.replace(clozeText, "...");
		ClozeCard.prototype.partialText = partialText;
		return partialText;
	}
}

// Export ClozeCard constructor
module.exports = ClozeCard;

