# SolariDisplay - A Split-Flap Display with CSS and JavaScript

Library to create a Split-Flap Display, or Solari Board. 

You can see the blog post here [Split-flap display with CSS and JavaScript](http://www.clicktorelease.com/blog/split-flap-display).

Forks, pull requests and code critiques are welcome!

#### Using the code ####

Include SolariDisplay.[min.]js and SolariDisplay.css. 

```html
<script src="SolariDisplay.min.js"></script>
<link href="SolariBoard.css">
````

You'll need to add this markup

```html
<div id="viewport" class="displayBase">
	<div id="container" ></div>
</div>
```

and this CSS
```css
#viewport{ position: absolute; left: 0; top: 0; right: 0; bottom: 0; }
#container{ position: absolute; left: 0; top: 0; right: 0; bottom: 0; font-family: sans-serif; }
```

and then this basic code:

```js
var display; // this will be the Solari Display object

window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame; // you'll need support for rAF

window.addEventListener( 'load', function() { // once the page loads

	// create a SolariDisplay

	/*
		parameters:
		container - the element that will contain the display
		format - an array of either a single character or an array of characters. 
			The length of this format array is the number of segments.
			There are several defines ready to use:
				CTR.SOLARIVALUES.letter: A to Z and space
				CTR.SOLARIVALUES.number: 0 to 9
				CTR.SOLARIVALUES.hour: 00 to 23
				CTR.SOLARIVALUES.minute: 00 to 59
		segmentWidth: the width in pixels of a single segment
		segmentHeight: the height in pixels of a single segment
		fontSize: the size of the font in pixels
	*/

	display = new CTR.SolariBoard( {
		container: container,
		format: [ 
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter,
			CTR.SOLARIVALUES.letter
		 ],
		segmentWidth: 70,
		segmentHeight: 120,
		fontSize: 100
	} );

	// update the content of the display
	display.setContent( 'HELLO WORLD' );

}, false );
```

#### License ####

MIT licensed

Copyright (C) 2012 Jaume Sanchez Elias, http://www.clicktorelease.com