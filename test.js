var expect = require("expect.js");
var qlass = require("./qlass");

qlass("Animal", {
	Animal: function(name) {
		this.name = name;
	},
	walk: function() {
		return this.name + " is walking.";
	}
});
qlass("Dog : Animal", {
	Dog: function(name) {
		this.base(name);
	},
	bark: function() {
		return this.name + " barks!";
	}
});
qlass("Poodle : Dog", {
	Poodle: function(name) {
		this.base(name);
		this.hasCurlyHair = true;
	}
});
qlass("Penny : Poodle", {
	Penny: function(name) {
		this.base(name);
		this.isPuppy = true;
	},
	bark: function() {
		return this.name + " yips!";
	}
});
qlass("NoConstructor");
qlass("NonEmptyNoConstructor", {
	testFunc: function() {}
});
qlass("Deep.Deeper.Deepest.SoSoDeep.Test");


describe("new Animal()", function() {
	var animal;
	beforeEach(function() {
		animal = new Animal("Animal");
	});
	it("creates a instance of Animal", function() {
		expect(animal instanceof Animal).to.be.ok();
	});
	it("was assigned a name of \"Animal\" by it's constructor", function() {
		expect(animal.name === "Animal").to.be.ok();
	});
	it("can walk", function() {
		expect(animal.walk() === "Animal is walking.").to.be.ok();
	});
});

describe("new Dog()", function() {
	var dog;
	beforeEach(function() {
		dog = new Dog("Dog");
	});
	it("creates a instance of Dog that inherits from Animal", function() {
		expect(dog instanceof Dog).to.be.ok();
		expect(dog instanceof Animal).to.be.ok();
	});
	it("was assigned a name of \"Dog\" by calling Animal's constructor", function() {
		expect(dog.name === "Dog").to.be.ok();
	});
	it("can walk because it's an Animal", function() {
		expect(dog.walk() === "Dog is walking.").to.be.ok();
	});
	it("can bark because it's a Dog", function() {
		expect(dog.bark() === "Dog barks!").to.be.ok();
	});
});

describe("new Poodle()", function() {
	var poodle;
	beforeEach(function() {
		poodle = new Poodle("Poodle");
	});
	it("creates a instance of Poodle that inherits from Dog that inherits from Animal", function() {
		expect(poodle instanceof Poodle).to.be.ok();
		expect(poodle instanceof Dog).to.be.ok();
		expect(poodle instanceof Animal).to.be.ok();
	});
	it("was assigned a name of \"Poodle\" by calling Animal's constructor", function() {
		expect(poodle.name === "Poodle").to.be.ok();
	});
	it("can walk because it's an Animal", function() {
		expect(poodle.walk() === "Poodle is walking.").to.be.ok();
	});
	it("can bark because it's a Dog", function() {
		expect(poodle.bark() === "Poodle barks!").to.be.ok();
	});
	it("has curly hair because it's a Poodle", function() {
		expect(poodle.hasCurlyHair).to.be.ok();
	});
});

describe("new Penny()", function() {
	var penny;
	beforeEach(function() {
		penny = new Penny("Penny");
	});
	it("creates a instance of Penny that inherits from Poodle that inherits from Dog that inherits from Animal", function() {
		expect(penny instanceof Penny).to.be.ok();
		expect(penny instanceof Poodle).to.be.ok();
		expect(penny instanceof Dog).to.be.ok();
		expect(penny instanceof Animal).to.be.ok();
	});
	it("was assigned a name of \"Penny\" by calling Animal's constructor", function() {
		expect(penny.name === "Penny").to.be.ok();
	});
	it("can walk because it's an Animal", function() {
		expect(penny.walk() === "Penny is walking.").to.be.ok();
	});
	it("cannot bark yet because it is a puppy", function() {
		expect(penny.bark() === "Penny yips!").to.be.ok();
	});
	it("has curly hair because it's a Poodle", function() {
		expect(penny.hasCurlyHair).to.be.ok();
	});
});

describe("protoype chain modification", function() {
	var penny;
	beforeEach(function() {
		penny = new Penny();
	});
	Animal.prototype.newProp = "propName";
	it("instance of Penny respects the prototype chain", function() {
		expect(penny.newProp === "propName").to.be.ok();
	});
});

describe("an empty class with no constructor", function() {
	var noConstructor;
	beforeEach(function() {
		noConstructor = new NoConstructor();
	});
	it("is in it's expected namespace", function() {
		expect(NoConstructor).to.be.ok();
	});
	it("really has no constructor", function() {
		expect(NoConstructor.prototype.hasOwnProperty("constructor")).to.not.be.ok();
	});
	it("is empty and functional", function() {
		expect(noConstructor.testFunc).to.not.be.ok();
		expect(noConstructor instanceof NoConstructor).to.be.ok();
	});
});

describe("a non-empty class with no constructor", function() {
	var nonEmptyNoConstructor;
	beforeEach(function() {
		nonEmptyNoConstructor = new NonEmptyNoConstructor();
	});
	it("is in it's expected namespace", function() {
		expect(NonEmptyNoConstructor).to.be.ok();
	});
	it("really has no constructor", function() {
		expect(NonEmptyNoConstructor.prototype.hasOwnProperty("constructor")).to.not.be.ok();
	});
	it("is not empty and functional", function() {
		expect(nonEmptyNoConstructor.testFunc).to.be.ok();
		expect(nonEmptyNoConstructor instanceof NonEmptyNoConstructor).to.be.ok();
	});
});

describe("deep namespaces", function() {
	it("created the expected namespaces", function() {
		expect(Deep).to.be.ok();
		expect(Deep.Deeper).to.be.ok();
		expect(Deep.Deeper.Deepest).to.be.ok();
		expect(Deep.Deeper.Deepest.SoSoDeep).to.be.ok();
		expect(Deep.Deeper.Deepest.SoSoDeep.Test).to.be.ok();
	});
});