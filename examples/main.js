var 
	x, y,
	container,
	display;

window.addEventListener( 'load', function() {

	container = document.querySelector( '#container' );

	window.addEventListener( 'mousemove', function( e ) {

		var 
			x = .1 * ( .5 * window.innerWidth - e.pageX ),
			y = .1 * ( .5 * window.innerHeight - e.pageY );

		container.style.webkitTransform = container.style.MozTransform = 'rotateY( ' + x + 'deg) rotateX( ' + y + 'deg)';
		e.preventDefault();

	} );

	window.addEventListener( 'touchmove', function( e ) {

		var 
			x = -.1 * ( .5 * window.innerWidth - e.changedTouches[ 0 ].pageX ),
			y = -.1 * ( .5 * window.innerHeight - e.changedTouches[ 0 ].pageY );

		container.style.webkitTransform = container.style.MozTransform = 'rotateY( ' + x + 'deg) rotateX( ' + y + 'deg)';
		e.preventDefault();

	} );

	window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

}, false );

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-625393-26']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();