function ValueHandler(identifier, initSize) {
	this.locked = ko.observable(false);
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
	this.buttonArray = ko.observableArray([
		//21.5", 20.25", 19.25", 19.0", 20", and 21
		new ValueHandler("Armpits", 43),
		new ValueHandler("Button 1", 41),
		new ValueHandler("Button 2", 39),
		new ValueHandler("Button 3", 37),
		new ValueHandler("Button 4", 39),
		new ValueHandler("Button 5", 41),
		new ValueHandler("Button 6", 41)]);
	this.lockHanlder = new LockHandler(this.buttonArray);

	ko.applyBindingsToNode(document.getElementById('example'), null, this);
}

function LockHandler(buttonArray) {
	this.buttonArray = buttonArray;
	this.locked = false;
	this.lockText = ko.observable("Lock");
	this.lockClicked = function() {
		this.locked = !this.locked;
		if (this.locked) {
			this.lockText('Unlock');
		} else {
			this.lockText('Lock');
		}
		this.buttonArray().forEach(function(button) {
			button.locked(this.locked);
		}.bind(this))
	}.bind(this)
	ko.applyBindingsToNode(document.getElementById('lockButton'), null, this);
}