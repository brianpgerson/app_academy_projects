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
    }
  }

  Root.$l = $l;

  function DOMNodeCollection(array) {
    this.htmlEls = array;

  }



})();
