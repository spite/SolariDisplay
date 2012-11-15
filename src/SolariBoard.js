var CTR = CTR || {};

CTR.SolariSegment = function( settings ) {

	var 
		_settings = settings,
		_speedFactor = Math.random() * .01,
		_speed = .25 + _speedFactor,
		_angle = 0,
		_currentValue = 0,
		_nextValue = 0,
		_values = _settings.values,
		_startTime = Date.now(),
		_li,
		_front,
		_flipFront,
		_flipBack,
		_back;

	function _init() {

		_li = document.createElement( 'li' );
		_li.className = 'segment';
		_li.style.width = _settings.width + 'px';
		_li.style.height = _settings.height + 'px';

		_front = document.createElement( 'div' );
		_front.className = 'front';
		_front.style.lineHeight = _settings.height + 'px';

		_flipFront = document.createElement( 'div' );
		_flipFront.className = 'flip-front';
		_flipFront.style.webkitTransformOrigin = _flipFront.style.MozTransformOrigin = '0 ' + .5 * _settings.height + 'px';
		
		_flipBack = document.createElement( 'div' );
		_flipBack.className = 'flip-back';
		_flipBack.style.lineHeight = _settings.height + 'px';
		_flipBack.style.webkitTransformOrigin = _flipBack.style.MozTransformOrigin = '0 ' + .5 * _settings.height + 'px';
		
		_back = document.createElement( 'div' );
		_back.className = 'back';
		
		_li.appendChild( _front );
		_li.appendChild( _flipFront );
		_li.appendChild( _flipBack );
		_li.appendChild( _back );

	}

	function _update() {

		var update = false;

		if( _currentValue != _nextValue ) {
		
			var time = Date.now();
			_angle += ( _speed * ( time - _startTime ) );
			_startTime = time;

			if( _angle >= 180 ) {

				_back.textContent = _values[ _currentValue ];
				_flipBack.textContent = _values[ _currentValue ];

				_currentValue++;
				_currentValue %= _values.length;

				_front.textContent = _values[ _currentValue ];
				_flipFront.textContent = _values[ _currentValue ];
				_angle %= 180;

			}

			update = true;
			
		} else {

			var time = Date.now();
			_angle += ( _speed * ( time - _startTime ) );
			_startTime = time;
			if( _angle >= 180 ) _angle = 180;

			//_back.textContent = _values[ _currentValue ];
			//_flipBack.textContent = _values[ _currentValue ];
			_front.textContent = _values[ _currentValue ];
			_flipFront.textContent = _values[ _currentValue ];

			update = true;

		}

		if( update ) {
		
			var c = Math.abs( 32 + 16 * Math.sin( _angle * Math.PI / 180 ) ) | 0;
			_flipFront.style.webkitTransform = _flipFront.style.MozTransform = 'rotateX(' + ( 180 - _angle ) + 'deg) translateY(' + .5 * _settings.height + 'px) translateZ(.1px)';
			_flipFront.style.backgroundColor = 'rgb(' + c + ',' + c + ',' + c + ')';
			var c = 170 - ( _angle * 170 / 180 ) | 0;
			_flipBack.style.webkitTransform = _flipBack.style.MozTransform = 'rotateX(-' + _angle + 'deg)';
			_flipBack.style.color = 'rgb(' + c + ',' + c + ',' + c + ')';
			var c = ( _angle * 170 / 180 ) | 0;
			_flipFront.style.color = 'rgb(' + c + ',' + c + ',' + c + ')';
			var c = Math.abs( 32 - 16 * Math.sin( _angle * Math.PI / 180 ) ) | 0;
			_flipBack.style.backgroundColor = 'rgb(' + c + ',' + c + ',' + c + ')';
		}

	}

	function _setContent( v ) {

		for( var j = 0; j < _values.length; j++ ) {
			if( _values[ j ] == v ) {
				_nextValue = j;
				return;
			}
		}
		_nextValue = 0;

	}

	_init();

	return {
		getElement: function() { return _li },
		setContent: _setContent,
		update: _update
	}

}

CTR.SOLARIVALUES = {
	letter: [ 
		' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
		'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 
		'T', 'U', 'V', 'W', 'X', 'Y', 'Z' 
	],
	number: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ],
	hour: [ 
		'00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
		'10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
		'20', '21', '22', '23', '24'
	],
	minute: [ 
		'00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
		'10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
		'20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
		'30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
		'40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
		'50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
	]
};

CTR.SolariBoard = function( settings ) {

	var
		_settings = settings,
		_display = document.createElement( 'div' ),
		_segments = document.createElement( 'ul' ),
		_segmentArray = []
	;

	function _setContent( v ) {

		for( var j = 0; j < _settings.format.length; j++ ) {
			var val = v[ j ];
			_segmentArray[ j ].setContent( val );
		}

	}

	function _addSegment( f ) {

		var v = f;
		var segment = new CTR.SolariSegment( {
			width: _settings.segmentWidth * v[ 0 ].length,
			height: _settings.segmentHeight,
			values: v
		} );
		
		_segmentArray.push( segment );
		_segments.appendChild( segment.getElement() );

	}

	function _init() {

		_display.className = 'display';
		_segments.className = 'segments';
		_display.style.fontSize = _settings.fontSize + 'px';

		var w = 0;
		for( var j = 0; j < _settings.format.length; j++ ) {
			_addSegment( _settings.format[ j ] );
			w += _settings.format[ j ][ 0 ].length * _settings.segmentWidth;
		}

		for( var j = 0; j < _segmentArray.length; j++ ) {
			if( j < _segmentArray.length - 1 ) {
				_segmentArray[ j ].getElement().style.marginRight = '4px';
				w += 4;
			}
		}
		_segments.style.width = w + 60 + 'px';
		_segments.style.height = _settings.segmentHeight + 60 + 'px';
		_display.style.width = w + 'px';
		_display.style.height = _settings.segmentHeight + 'px';
		_display.style.marginLeft = - .5 * ( w + 60 ) + 'px';
		_display.style.marginTop = - .5 * _settings.segmentHeight + 'px';
		_display.style.webkitPerspectiveOrigin = _display.style.MozPerspectiveOrigin = ( .5 * w ) +'px ' + _settings.segmentHeight + 'px';  
		_display.style.webkitTransformOrigin = _display.style.MozTransformOrigin = ( .5 * w ) +'px ' + _settings.segmentHeight + 'px';  

		_display.appendChild( _segments );
		_settings.container.appendChild( _display );

		_update();
	}

	function _update() {

		window.requestAnimationFrame( _update );
		for( var j = 0; j < _segmentArray.length; j++ ) {
			_segmentArray[ j ].update();
		}

	}

	_init();

	return {

		getDisplay: function() { return _segments; },
		setContent: _setContent

	}

}