Function.prototype.inherits = function(superclass) {
  function Surrogate () {}
  Surrogate.prototype = superclass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};


function Animal(name) {
  this.name = name.toUpperCase();
}

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog (name) {
  Animal.call(this, name);
}
Dog.inherits(Animal);

//ta answer

function Dog (name) {
  this.name = name;
}

Dog.prototype.bark = function () {
  console.log(this.name + " barks!");
};

function Corgi (name) {
  Dog.call(this, name);
}

Corgi.inherits(Dog);

Corgi.prototype.waddle = function () {
  console.log(this.name + " waddles!");
};

var blixa = new Corgi("Blixa");
blixa.bark();
blixa.waddle();
