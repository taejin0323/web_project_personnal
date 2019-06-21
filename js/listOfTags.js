
String.prototype.toKeyCodes = function() {
  var codes = new Array(), string = this.split('');
  for (var i=0; i<string.length; i++) {
    codes[i] = keycodes[string[i].charCodeAt(0)];
  }
  return codes;
}

// List of HTML tags
var htmlList = [
  "doctype", "title", "link", "meta", "style",
  "strong", "em", "abbr", "acronym", "address", "bdo", "blockquote", "cite", "q", "code", "ins", "del", "dfn", "kbd", "pre", "samp", "var", "br",
   "base",
  "img", "area", "map", "param", "object",
  "ul", "ol", "li", "dl", "dt", "dd",
  "table", "tr", "td", "th", "tbody", "thead", "tfoot", "col", "colgroup", "caption",
  "form", "input", "textarea", "select", "option", "optgroup", "button", "label", "fieldset", "legend",
  "script", "noscript"
]
