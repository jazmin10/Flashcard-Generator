/* ASSIGNMENT #11: FLASHCARD-GENERATOR */

var ClozeCard = function(text, cloze){
	this.text = text;
	this.cloze = cloze;
	// this.partial = function(){
	// 	var fullText = this.text.toLowerCase();
	// 	var clozeText = this.cloze.toLowerCase();

	// 	var search = fullText.search(clozeText);

	// 	if (search === -1) {
	// 		return "Cloze text not found";
	// 	}
	// 	else {
	// 		var partialText = fullText.replace(clozeText, "...");
	// 		return partialText;
	// 	}
	// } 
}

ClozeCard.prototype.partial = function(){
	var fullText = this.text.toLowerCase();
	var clozeText = this.cloze.toLowerCase();

	var search = fullText.search(clozeText);

	if (search === -1) {
		return "Cloze text not found";
	}
	else {
		var partialText = fullText.replace(clozeText, "...");
		ClozeCard.prototype.partialText = partialText;
		return partialText;
	}
}

module.exports = ClozeCard;

