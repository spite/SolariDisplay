var 
	x, y,
	container,
	display;

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}())

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

}, false );

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-625393-26']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();