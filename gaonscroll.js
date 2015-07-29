var GAOnScroll;

(function(exports) {
	exports.attach = function(selector) {
		'use strict';

		return function(moduleName) {
			var send,
				getPositions,
				positions,
				moduleNumber,
				statusToSend,
				fireEvent;

			send = function(moduleName) {
				// make things here!
				console.log('sending... ', moduleName);
			};

			getPositions = function() {
				var positions,
					selectors;

				positions = [];
				selectors = $(selector);

				selectors.map(function(index, current) {
					var currOffsetTop,
						currHeight,
						docHeight,
						windowHeight;

					currOffsetTop = $(current).offset().top;
					currHeight = $(current).height();
					docHeight = $(document).height();
					windowHeight = $(window).height();

					if (currOffsetTop + currHeight >= docHeight) {
						positions.push(Math.floor(docHeight - windowHeight));
					} else {
						positions.push(Math.floor(currOffsetTop));
					}
				});

				return positions;
			};

			positions = getPositions();
			moduleNumber = 0;
			statusToSend = false;

			fireEvent = function() {
				var scrollActualPosition,
					i,
					length,
					timeout;

				scrollActualPosition = $(this).scrollTop();

				for (i = 0, length = positions.length; i <= length; i += 1) {
					if (moduleNumber === i && scrollActualPosition >= positions[i]) {
						moduleNumber = i + 1;
						statusToSend = true;
					}
				}

				if (statusToSend) {
					clearTimeout(timeout);
					timeout = setTimeout(function() {
						for (i = 0, length = positions.length; i <= length; i += 1) {
							if (moduleNumber === i + 1) {
								send(moduleName);
							}
						}
					}, 250);
					statusToSend = false;
				}
			};

			$(window).on('scroll', fireEvent);
		};
	};
})(this.GAOnScroll = {});
