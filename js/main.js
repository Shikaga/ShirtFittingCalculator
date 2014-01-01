function ValueHandler(identifier, initSize) {
	this.identifier = identifier;
	this.circumference = ko.observable(initSize);
	this.width = ko.observable(-1);

	this.min = ko.observable(1);
	this.max = ko.observable(100);
	this.units = ko.observable("inches");
	this.circumference.subscribe(function(value) {
		this.calculateWidth();
		console.log(value);
	}.bind(this))

	this.calculateWidth();
}

ValueHandler.prototype.calculateWidth = function() {
	var width = (parseFloat(this.circumference()) + 5) / 2;
	this.width(width); //inches!
}

function ShirtFittingCalculator() {
	this.exampleArray = ko.observableArray([
		//21.5", 20.25", 19.25", 19.0", 20", and 21
		new ValueHandler("Armpits", 43),
		new ValueHandler("Button 1", 41),
		new ValueHandler("Button 2", 39),
		new ValueHandler("Button 3", 37),
		new ValueHandler("Button 4", 39),
		new ValueHandler("Button 5", 41),
		new ValueHandler("Button 6", 41)]);
	ko.applyBindingsToNode(document.getElementById('example'), null, this);
}