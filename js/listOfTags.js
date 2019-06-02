
String.prototype.toKeyCodes = function() {
  var codes = new Array(), string = this.split('');
  for (var i=0; i<string.length; i++) {
    codes[i] = keycodes[string[i].charCodeAt(0)];
  }
  return codes;
}

// List of HTML tags
var htmlList = [
  "html", "head", "meta", "base", "link", "style", "title", "address", "article", "a"

]
