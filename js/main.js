function ValueHandler(identifier, initSize) {
	this.locked = ko.observable(false);
	this.identifier = identifier;
	this.unitMultiplier = ko.observable(1.0);
	this.circumference = ko.observable(initSize);
	this.getCleanNumber = function(rawNumber) {
		return rawNumber.toString().substr(0,4);
	}
	this.calcCircumference = ko.computed(function() {
		var rawNumber = this.circumference() * this.unitMultiplier();
		return this.getCleanNumber(rawNumber);
	}.bind(this));
	this.width = ko.observable(-1);
	this.calcWidth = ko.computed(function() {
		var rawNumber = this.width() * this.unitMultiplier();
		return this.getCleanNumber(rawNumber);
	}.bind(this));

	this.min = ko.observable(1);
	this.max = ko.observable(100);
	this.units = ko.observable("inches");
	this.units.subscribe(function(unit) {
	}.bind(this))
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
	this.unitHandler = new UnitHandler(this.buttonArray);

	ko.applyBindingsToNode(document.getElementById('example'), null, this);
}

function UnitHandler(buttonArray) {
	this.buttonArray = buttonArray;
	this.metricButtonEnabled = ko.observable(true);
	this.imperialButtonEnabled = ko.observable(false);
	this.imperialClicked = function() {
		this.setUnit('inches');
	}.bind(this);
	this.metricClicked = function() {
		this.setUnit('cm');
	}.bind(this);
	this.multiplierMap = {
		"cm": 1.6,
		"inches": 1.0
	}
	this.setUnit = function(unit) {
		if (unit === 'inches') {
			this.imperialButtonEnabled(false);
			this.metricButtonEnabled(true);
		} else {
			this.imperialButtonEnabled(true);
			this.metricButtonEnabled(false);
		}
		this.buttonArray().forEach(function(button) {
			button.units(unit);
			button.unitMultiplier(this.multiplierMap[unit]);
		}.bind(this))
	}.bind(this);
	ko.applyBindingsToNode(document.getElementById('metricButton'), null, this);
	ko.applyBindingsToNode(document.getElementById('imperialButton'), null, this);
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