walk(document.body);

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

function handleText(textNode) {
	var v = textNode.nodeValue;
  v = v.replace(/a\.i\.|\b(ai|agi|artificial( |-)intelligence|ml|machine learning|deep learning)\b/gi, "Mark Zuckerberg")
  v = v.replace(/(a)n mark zuckerberg/gi, "$1 Mark Zuckerberg");
	textNode.nodeValue = v;
}
