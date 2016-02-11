(function(){

  if (window.Root === undefined) {
    window.Root = {};
  }

  var Root = window.Root;

  function $l(arg){
    if (typeof arg === "string") {
      var nodeList = document.querySelectorAll(arg);
      var nodes = [].slice.call(nodeList);
      return new DOMNodeCollection(nodes);
    } else if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    } else if (Array.isArray(arg)){
      if (arg.every(function(el){ return el instanceof HTMLElement; })){
        return new DOMNodeCollection(arg);
      }
    }
  }

  Root.$l = $l;

  function DOMNodeCollection(array) {
    this.htmlEls = array;
  }

  DOMNodeCollection.prototype.html = function(string) {
    if (string === undefined) {
      return this.htmlEls[0].innerHTML;
    } else {
      this.htmlEls.forEach(function(el) {
        el.innerHTML = string;
      });
      return "HTML is updated to " + string;
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.htmlEls.forEach(function(el) {
      el.innerHTML = null;
    });
  };

  DOMNodeCollection.prototype.append = function (arg) {
    if (arg.hasOwnProperty("htmlEls")) {
      arg.htmlEls.forEach(function(newEl) {
        debugger;
        this.append(newEl);
      }.bind(this));
    } else if (arg instanceof HTMLElement) {
      this.htmlEls.forEach( function(el) {
        el.appendChild(arg);
      });
    } else {
      this.htmlEls.forEach(function(el) {
        el.innerHTML += arg;
      });
    }
  };

  DOMNodeCollection.prototype.attr = function (attribute, value) {
    if (value === undefined) {
      var output = [];
      this.htmlEls.forEach(function(el) {
        output.push(el.getAttribute(attribute));
      });
      return output;
    } else {
      this.htmlEls.forEach(function(el) {
        el.setAttribute(attribute, value);
      });
    }
  };

  DOMNodeCollection.prototype.addClass = function (string) {
    this.htmlEls.forEach(function(el) {
      el.classList.add(string);
    });
  };

  DOMNodeCollection.prototype.removeClass = function (string) {
    this.htmlEls.forEach(function(el) {
      el.classList.remove(string);
    });
  };


})();


// test1 = document.createElement('li')
// test2 = document.createElement('li')
// test3 = document.createElement('li')
//
// fun = [test1, test2, test3]
// fun.forEach(function(el) {el.innerHTML = "testing"})
//
// domfun = Root.$l(fun)
// ul = Root.$l('ul')
//








//whitespace
