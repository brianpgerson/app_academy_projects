(function(){
  if (window.Root === undefined) {
    window.Root = {};
  }

  var Root = window.Root;
  var queue = [];

  document.addEventListener("DOMContentLoaded", function(event){
    queue.forEach (function(func) {
      func();
    });
  });

  Root.$l = $l;

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
    } else if (typeof (arg) === "function") {
      queue.push(arg);
    }
  }

  Function.prototype.extend = function(output) {
    debugger;
    var args = [].slice.call(arguments, 1);

    args.forEach (function(arg) {
      var allKeys = Object.keys(arg);
      allKeys.forEach (function(key) {
        output[key] = arg[key];
      });
    });
    return output;
  };


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

  DOMNodeCollection.prototype.children = function () {
    var allChildren = [];
    this.htmlEls.forEach(function(el){
      var children = [].slice.apply(el.children);
      allChildren = allChildren.concat(children);
    });
    return new DOMNodeCollection(allChildren);
  };


  DOMNodeCollection.prototype.parent = function () {
    var parents = [];
    this.htmlEls.forEach(function(el){
      parents.push(el.parentElement);
    });
    return new DOMNodeCollection(parents);
  };


  DOMNodeCollection.prototype.find = function (selector) {
    var foundStuff = [];
    this.htmlEls.forEach(function(el) {
      foundStuff =
        foundStuff.concat([].slice.apply(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(foundStuff);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.htmlEls.forEach(function(el) {
      el.remove();
    });
    return "that shit goooonnnneee";
  };

  DOMNodeCollection.prototype.on = function(action, callback) {
    this.htmlEls.forEach(function(el) {
      el.addEventListener(action, callback);
    });
  };

  DOMNodeCollection.prototype.off = function(action, callback) {
    this.htmlEls.forEach(function(el) {
      el.removeEventListener(action, callback);
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
