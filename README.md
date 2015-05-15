# qlass
A classical inheritance implementation in JavaScript

# usage
```
npm install
npm test
```

# example
```javascript
qlass("Animal", {
	Animal: function(name) { this.name = name; },
	walk: function() { return this.name + " is walking."; }
});

qlass("Animals.Dog : Animal", {
	Dog: function(name) { this.base(name); },
	bark: function() { return this.name + " barks!"; }
});

var fido = new Animals.Dog('Fido');
console.log(fido.bark()); // Fido barks! - from Dog class
console.log(walk.bark()); // Fido is walking. - from Animal class
```
