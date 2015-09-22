(function() {
	var canvas = document.getElementById('planet');
	var planet = planetaryjs.planet();
	planet.loadPlugin(autorotate(90));
	planet.loadPlugin(planetaryjs.plugins.earth({
		topojson: { file: './world.json' },
		oceans: { fill: '#228888' },
		land: { fill: '#ffffff' },
		borders: { stroke: '#ffffff' }
	}));
	planet.loadPlugin(planetaryjs.plugins.pings());
	planet.projection.scale(canvas.width/2).translate([canvas.width/2,canvas.height/2]).rotate([0,0,0]);
	var colors = ['#000000'];
	setInterval(function() {
		var lat = Math.random()*180-90;
		var lng = Math.random()*360-180;
		var color = colors[Math.floor(Math.random()*colors.length)];
		planet.plugins.pings.add(lng, lat, { color: color, ttl: 1000, angle: 15+Math.random()*20 });
	}, 1000);
	planet.draw(canvas);
	function autorotate(degPerSec) {
		return function(planet) {
			var lastTick = null;
			var paused = false;
			planet.plugins.autorotate = {
				pause:  function() { paused = true;  },
				resume: function() { paused = false; }
			};
			planet.onDraw(function() {
				if (paused || !lastTick) {
					lastTick = new Date();
				} else {
					var now = new Date();
					var delta = now - lastTick;
					var rotation = planet.projection.rotate();
					rotation[0] += degPerSec * delta / 1000;
					if (rotation[0] >= 180) rotation[0] -= 360;
					planet.projection.rotate(rotation);
					lastTick = now;
				}
			});
		};
	};
})();
function introUl() {
	var w = 0;
	$('.introduction ul li').each(function() {
		w = w+$(this).outerWidth();
	});
	var r = ($('.introduction ul').outerWidth()-w)/($('.introduction ul li').size()-1)-3;
	$('.introduction ul li').css({
		'margin-right': r+'px'
	});
}
function indexUl() {
	var r = ($('.index ul').outerWidth()-$('.index ul li').width()*3)/2-3;
	$('.index ul li').css({
		'margin-right': r+'px'
	});
}
function footerNav() {
	var w = 0;
	$('footer .nav li').each(function() {
		w = w+$(this).outerWidth();
	});
	var r = ($('footer .nav').outerWidth()-w)/($('footer .nav li').size()-1)-3;
	$('footer .nav li').css({
		'margin-right': r+'px'
	});
}
$(document).ready(function() {
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});
$(window).load(function() {
	if ( $('.introduction').length > 0 ) {
		introUl();
		$('.introduction ul').css({
			'opacity': '1'
		});
	}
	if ( $('.index ul').length > 0 ) {
		indexUl();
		$('.index ul').css({
			'opacity': '1'
		});
	}
	if ( $('footer .nav').length > 0 ) {
		footerNav();
		$('footer .nav').css({
			'opacity': '1'
		});
	}
});
$(window).resize(function() {
	if ( $('.introduction').length > 0 ) {
		introUl();
	}
	if ( $('.index ul').length > 0 ) {
		indexUl();
	}
	if ( $('footer .nav').length > 0 ) {
		footerNav();
	}
});