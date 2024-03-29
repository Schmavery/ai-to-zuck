function walk(node, handler)
{
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child, handler);
				child = next;
			}
			break;

		case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handler(node);
            }
			break;
	}
}

let regex = /\b(artificial general intelligence|artificial( |-)intelligence|machine learning|deep learning)\b/gi;
let regexAbbrev = /\b(A\.I\.|AI|AGI|ML)\b/g;

var pageIsAboutAI = false;

function detectSentiment(textNode) {
  if (regex.test(textNode.nodeValue)) {
    pageIsAboutAI = true;
  }
}

function handleText(textNode) {
	var v = textNode.nodeValue;
  if (regex.test(v) || regexAbbrev.test(v)) {
    v = v.replace(regex, "Mark Zuckerberg");
    v = v.replace(regexAbbrev, "Mark Zuckerberg");
    v = v.replace(/(a)n mark zuckerberg/gi, "$1 Mark Zuckerberg");
    textNode.nodeValue = v;
  }
}

function checkEditable(node) {
  var curr = node;
  var count = 6;
  while (curr && count-- > 0 && (curr = curr.parentNode)){
    if (curr.contentEditable == "true") return true;
  };
  return false;
}

var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0 && !checkEditable(mutation.target)) {
      walk(mutation.target, handleText);
    }
  });
});

walk(document.body, detectSentiment);
if (pageIsAboutAI) {
  walk(document.body, handleText);

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
};
