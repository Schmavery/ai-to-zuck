function walk(node) 
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
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
			break;
	}
}

let regex = /\b(artificial( |-)intelligence|machine learning|deep learning)\b/gi;
let regexCS = /\b(A\.I\.|AI|AGI|ML)\b/g;

function handleText(textNode) {
	var v = textNode.nodeValue;
  if (regex.test(v) || regexCS.test(v)) {
    v = v.replace(regex, "Mark Zuckerberg");
    v = v.replace(regexCS, "Mark Zuckerberg");
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

walk(document.body);

var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length > 0 && !checkEditable(mutation.target)) {
      walk(mutation.target);
    }
  });
});

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
});
