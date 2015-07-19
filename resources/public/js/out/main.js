if(typeof Math.imul == "undefined" || (Math.imul(0xffffffff,5) == 0)) {
    Math.imul = function (a, b) {
        var ah  = (a >>> 16) & 0xffff;
        var al = a & 0xffff;
        var bh  = (b >>> 16) & 0xffff;
        var bl = b & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
    }
}

;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());

var g,ca=this;
function r(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
b&&"undefined"==typeof a.call)return"object";return b}function da(a){return"string"==typeof a}var fa="closure_uid_"+(1E9*Math.random()>>>0),ga=0;var ha=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function ia(a){return Array.prototype.join.call(arguments,"")}function la(a,b){return a<b?-1:a>b?1:0};var ma=Array.prototype,na=ma.indexOf?function(a,b,c){return ma.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(da(a))return da(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},pa=ma.filter?function(a,b,c){return ma.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=da(a)?a.split(""):a,k=0;k<d;k++)if(k in h){var l=h[k];b.call(c,l,k,a)&&(e[f++]=l)}return e};
function qa(a,b,c){return 2>=arguments.length?ma.slice.call(a,b):ma.slice.call(a,b,c)};var ra;a:{var ta=ca.navigator;if(ta){var ua=ta.userAgent;if(ua){ra=ua;break a}}ra=""};function va(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function xa(a){var b=arguments.length;if(1==b&&"array"==r(arguments[0]))return xa.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};function ya(){return-1!=ra.indexOf("Edge")};var za=-1!=ra.indexOf("Opera")||-1!=ra.indexOf("OPR"),Aa=-1!=ra.indexOf("Edge")||-1!=ra.indexOf("Trident")||-1!=ra.indexOf("MSIE"),Da=-1!=ra.indexOf("Gecko")&&!(-1!=ra.toLowerCase().indexOf("webkit")&&!ya())&&!(-1!=ra.indexOf("Trident")||-1!=ra.indexOf("MSIE"))&&!ya(),Ea=-1!=ra.toLowerCase().indexOf("webkit")&&!ya();
function Fa(){var a=ra;if(Da)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Aa&&ya())return/Edge\/([\d\.]+)/.exec(a);if(Aa)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Ea)return/WebKit\/(\S+)/.exec(a)}function Ga(){var a=ca.document;return a?a.documentMode:void 0}var Ha=function(){if(za&&ca.opera){var a=ca.opera.version;return"function"==r(a)?a():a}var a="",b=Fa();b&&(a=b?b[1]:"");return Aa&&!ya()&&(b=Ga(),b>parseFloat(a))?String(b):a}(),Ia={};
function Ja(a){var b;if(!(b=Ia[a])){b=0;for(var c=ha(String(Ha)).split("."),d=ha(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var h=c[f]||"",k=d[f]||"",l=RegExp("(\\d*)(\\D*)","g"),m=RegExp("(\\d*)(\\D*)","g");do{var n=l.exec(h)||["","",""],p=m.exec(k)||["","",""];if(0==n[0].length&&0==p[0].length)break;b=la(0==n[1].length?0:parseInt(n[1],10),0==p[1].length?0:parseInt(p[1],10))||la(0==n[2].length,0==p[2].length)||la(n[2],p[2])}while(0==b)}b=Ia[a]=0<=b}return b}
var Ka=ca.document,La=Ga(),Na=!Ka||!Aa||!La&&ya()?void 0:La||("CSS1Compat"==Ka.compatMode?parseInt(Ha,10):5);!Da&&!Aa||Aa&&Aa&&(ya()||9<=Na)||Da&&Ja("1.9.1");Aa&&Ja("9");xa("area base br col command embed hr img input keygen link meta param source track wbr".split(" "));function Oa(a,b,c){var d=document;c=c||d;var e=a&&"*"!=a?a.toUpperCase():"";if(c.querySelectorAll&&c.querySelector&&(e||b))return c.querySelectorAll(e+(b?"."+b:""));if(b&&c.getElementsByClassName){a=c.getElementsByClassName(b);if(e){c={};for(var f=d=0,h;h=a[f];f++)e==h.nodeName&&(c[d++]=h);c.length=d;return c}return a}a=c.getElementsByTagName(e||"*");if(b){c={};for(f=d=0;h=a[f];f++){var e=h.className,k;if(k="function"==typeof e.split)k=0<=na(e.split(/\s+/),b);k&&(c[d++]=h)}c.length=d;return c}return a}
;function Pa(a){a=a.className;return da(a)&&a.match(/\S+/g)||[]}function Qa(a,b){for(var c=Pa(a),d=c,e=qa(arguments,1),f=0;f<e.length;f++)0<=na(d,e[f])||d.push(e[f]);a.className=c.join(" ")}function Ra(a,b){var c=Pa(a),c=Sa(c,qa(arguments,1));a.className=c.join(" ")}function Sa(a,b){return pa(a,function(a){return!(0<=na(b,a))})}function Ua(a){var b=Va,c=Pa(b);(c=!(0<=na(c,a)))?Qa(b,a):Ra(b,a);return c};function Wa(a,b){null!=a&&this.append.apply(this,arguments)}g=Wa.prototype;g.Ga="";g.set=function(a){this.Ga=""+a};g.append=function(a,b,c){this.Ga+=a;if(null!=b)for(var d=1;d<arguments.length;d++)this.Ga+=arguments[d];return this};g.clear=function(){this.Ga=""};g.toString=function(){return this.Ga};if("undefined"===typeof Xa)var Xa=function(){throw Error("No *print-fn* fn set for evaluation environment");};var Ya=null;if("undefined"===typeof Za)var Za=null;function $a(){return new ab(null,5,[bb,!0,cb,!0,eb,!1,fb,!1,gb,null],null)}function w(a){return null!=a&&!1!==a}function hb(a){return a instanceof Array}function x(a,b){return a[r(null==b?null:b)]?!0:a._?!0:!1}
function A(a,b){var c=null==b?null:b.constructor,c=w(w(c)?c.Mb:c)?c.Lb:r(b);return Error(["No protocol method ",a," defined for type ",c,": ",b].join(""))}function ib(a){var b=a.Lb;return w(b)?b:""+C(a)}var jb="undefined"!==typeof Symbol&&"function"===r(Symbol)?Symbol.iterator:"@@iterator";function D(a){for(var b=a.length,c=Array(b),d=0;;)if(d<b)c[d]=a[d],d+=1;else break;return c}
var kb={},lb={},mb=function mb(b){if(b?b.X:b)return b.X(b);var c;c=mb[r(null==b?null:b)];if(!c&&(c=mb._,!c))throw A("ICounted.-count",b);return c.call(null,b)},ob=function ob(b,c){if(b?b.K:b)return b.K(b,c);var d;d=ob[r(null==b?null:b)];if(!d&&(d=ob._,!d))throw A("ICollection.-conj",b);return d.call(null,b,c)},pb={},E=function E(){switch(arguments.length){case 2:return E.c(arguments[0],arguments[1]);case 3:return E.i(arguments[0],arguments[1],arguments[2]);default:throw Error([C("Invalid arity: "),
C(arguments.length)].join(""));}};E.c=function(a,b){if(a?a.M:a)return a.M(a,b);var c;c=E[r(null==a?null:a)];if(!c&&(c=E._,!c))throw A("IIndexed.-nth",a);return c.call(null,a,b)};E.i=function(a,b,c){if(a?a.ba:a)return a.ba(a,b,c);var d;d=E[r(null==a?null:a)];if(!d&&(d=E._,!d))throw A("IIndexed.-nth",a);return d.call(null,a,b,c)};E.S=3;
var qb={},F=function F(b){if(b?b.V:b)return b.V(b);var c;c=F[r(null==b?null:b)];if(!c&&(c=F._,!c))throw A("ISeq.-first",b);return c.call(null,b)},H=function H(b){if(b?b.$:b)return b.$(b);var c;c=H[r(null==b?null:b)];if(!c&&(c=H._,!c))throw A("ISeq.-rest",b);return c.call(null,b)},rb={},sb={},I=function I(){switch(arguments.length){case 2:return I.c(arguments[0],arguments[1]);case 3:return I.i(arguments[0],arguments[1],arguments[2]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));
}};I.c=function(a,b){if(a?a.N:a)return a.N(a,b);var c;c=I[r(null==a?null:a)];if(!c&&(c=I._,!c))throw A("ILookup.-lookup",a);return c.call(null,a,b)};I.i=function(a,b,c){if(a?a.F:a)return a.F(a,b,c);var d;d=I[r(null==a?null:a)];if(!d&&(d=I._,!d))throw A("ILookup.-lookup",a);return d.call(null,a,b,c)};I.S=3;
var tb=function tb(b,c,d){if(b?b.Na:b)return b.Na(b,c,d);var e;e=tb[r(null==b?null:b)];if(!e&&(e=tb._,!e))throw A("IAssociative.-assoc",b);return e.call(null,b,c,d)},ub={},vb={},wb=function wb(b){if(b?b.jb:b)return b.jb();var c;c=wb[r(null==b?null:b)];if(!c&&(c=wb._,!c))throw A("IMapEntry.-key",b);return c.call(null,b)},xb=function xb(b){if(b?b.kb:b)return b.kb();var c;c=xb[r(null==b?null:b)];if(!c&&(c=xb._,!c))throw A("IMapEntry.-val",b);return c.call(null,b)},yb={},zb=function zb(b,c,d){if(b?b.lb:
b)return b.lb(b,c,d);var e;e=zb[r(null==b?null:b)];if(!e&&(e=zb._,!e))throw A("IVector.-assoc-n",b);return e.call(null,b,c,d)},Ab=function Ab(b){if(b?b.xb:b)return b.state;var c;c=Ab[r(null==b?null:b)];if(!c&&(c=Ab._,!c))throw A("IDeref.-deref",b);return c.call(null,b)},Bb={},Cb=function Cb(b){if(b?b.H:b)return b.H(b);var c;c=Cb[r(null==b?null:b)];if(!c&&(c=Cb._,!c))throw A("IMeta.-meta",b);return c.call(null,b)},Db={},Eb=function Eb(b,c){if(b?b.R:b)return b.R(b,c);var d;d=Eb[r(null==b?null:b)];if(!d&&
(d=Eb._,!d))throw A("IWithMeta.-with-meta",b);return d.call(null,b,c)},Gb={},Hb=function Hb(){switch(arguments.length){case 2:return Hb.c(arguments[0],arguments[1]);case 3:return Hb.i(arguments[0],arguments[1],arguments[2]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}};Hb.c=function(a,b){if(a?a.T:a)return a.T(a,b);var c;c=Hb[r(null==a?null:a)];if(!c&&(c=Hb._,!c))throw A("IReduce.-reduce",a);return c.call(null,a,b)};
Hb.i=function(a,b,c){if(a?a.U:a)return a.U(a,b,c);var d;d=Hb[r(null==a?null:a)];if(!d&&(d=Hb._,!d))throw A("IReduce.-reduce",a);return d.call(null,a,b,c)};Hb.S=3;
var Ib=function Ib(b,c){if(b?b.m:b)return b.m(b,c);var d;d=Ib[r(null==b?null:b)];if(!d&&(d=Ib._,!d))throw A("IEquiv.-equiv",b);return d.call(null,b,c)},Jb=function Jb(b){if(b?b.D:b)return b.D(b);var c;c=Jb[r(null==b?null:b)];if(!c&&(c=Jb._,!c))throw A("IHash.-hash",b);return c.call(null,b)},Kb={},Lb=function Lb(b){if(b?b.P:b)return b.P(b);var c;c=Lb[r(null==b?null:b)];if(!c&&(c=Lb._,!c))throw A("ISeqable.-seq",b);return c.call(null,b)},Mb={},J=function J(b,c){if(b?b.sb:b)return b.sb(0,c);var d;d=
J[r(null==b?null:b)];if(!d&&(d=J._,!d))throw A("IWriter.-write",b);return d.call(null,b,c)},Nb={},Ob=function Ob(b,c,d){if(b?b.B:b)return b.B(b,c,d);var e;e=Ob[r(null==b?null:b)];if(!e&&(e=Ob._,!e))throw A("IPrintWithWriter.-pr-writer",b);return e.call(null,b,c,d)},Pb=function Pb(b,c,d){if(b?b.rb:b)return b.rb(0,c,d);var e;e=Pb[r(null==b?null:b)];if(!e&&(e=Pb._,!e))throw A("IWatchable.-notify-watches",b);return e.call(null,b,c,d)},Qb=function Qb(b){if(b?b.Ua:b)return b.Ua(b);var c;c=Qb[r(null==b?
null:b)];if(!c&&(c=Qb._,!c))throw A("IEditableCollection.-as-transient",b);return c.call(null,b)},Rb=function Rb(b,c){if(b?b.Za:b)return b.Za(b,c);var d;d=Rb[r(null==b?null:b)];if(!d&&(d=Rb._,!d))throw A("ITransientCollection.-conj!",b);return d.call(null,b,c)},Sb=function Sb(b){if(b?b.$a:b)return b.$a(b);var c;c=Sb[r(null==b?null:b)];if(!c&&(c=Sb._,!c))throw A("ITransientCollection.-persistent!",b);return c.call(null,b)},Tb=function Tb(b,c,d){if(b?b.Oa:b)return b.Oa(b,c,d);var e;e=Tb[r(null==b?null:
b)];if(!e&&(e=Tb._,!e))throw A("ITransientAssociative.-assoc!",b);return e.call(null,b,c,d)},Ub=function Ub(b,c,d){if(b?b.qb:b)return b.qb(0,c,d);var e;e=Ub[r(null==b?null:b)];if(!e&&(e=Ub._,!e))throw A("ITransientVector.-assoc-n!",b);return e.call(null,b,c,d)},Vb=function Vb(b){if(b?b.pb:b)return b.pb();var c;c=Vb[r(null==b?null:b)];if(!c&&(c=Vb._,!c))throw A("IChunk.-drop-first",b);return c.call(null,b)},Wb=function Wb(b){if(b?b.hb:b)return b.hb(b);var c;c=Wb[r(null==b?null:b)];if(!c&&(c=Wb._,!c))throw A("IChunkedSeq.-chunked-first",
b);return c.call(null,b)},Xb=function Xb(b){if(b?b.ib:b)return b.ib(b);var c;c=Xb[r(null==b?null:b)];if(!c&&(c=Xb._,!c))throw A("IChunkedSeq.-chunked-rest",b);return c.call(null,b)},Yb=function Yb(b){if(b?b.gb:b)return b.gb(b);var c;c=Yb[r(null==b?null:b)];if(!c&&(c=Yb._,!c))throw A("IChunkedNext.-chunked-next",b);return c.call(null,b)},Zb=function Zb(b,c){if(b?b.Gb:b)return b.Gb(b,c);var d;d=Zb[r(null==b?null:b)];if(!d&&(d=Zb._,!d))throw A("IReset.-reset!",b);return d.call(null,b,c)},L=function L(){switch(arguments.length){case 2:return L.c(arguments[0],
arguments[1]);case 3:return L.i(arguments[0],arguments[1],arguments[2]);case 4:return L.A(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return L.L(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}};L.c=function(a,b){if(a?a.Hb:a)return a.Hb(a,b);var c;c=L[r(null==a?null:a)];if(!c&&(c=L._,!c))throw A("ISwap.-swap!",a);return c.call(null,a,b)};
L.i=function(a,b,c){if(a?a.Ib:a)return a.Ib(a,b,c);var d;d=L[r(null==a?null:a)];if(!d&&(d=L._,!d))throw A("ISwap.-swap!",a);return d.call(null,a,b,c)};L.A=function(a,b,c,d){if(a?a.Jb:a)return a.Jb(a,b,c,d);var e;e=L[r(null==a?null:a)];if(!e&&(e=L._,!e))throw A("ISwap.-swap!",a);return e.call(null,a,b,c,d)};L.L=function(a,b,c,d,e){if(a?a.Kb:a)return a.Kb(a,b,c,d,e);var f;f=L[r(null==a?null:a)];if(!f&&(f=L._,!f))throw A("ISwap.-swap!",a);return f.call(null,a,b,c,d,e)};L.S=5;
var $b=function $b(b){if(b?b.Wa:b)return b.Wa(b);var c;c=$b[r(null==b?null:b)];if(!c&&(c=$b._,!c))throw A("IIterable.-iterator",b);return c.call(null,b)};function ac(a){this.Nb=a;this.h=1073741824;this.u=0}ac.prototype.sb=function(a,b){return this.Nb.append(b)};function bc(a){var b=new Wa;a.B(null,new ac(b),$a());return""+C(b)}
var cc="undefined"!==typeof Math.imul&&0!==Math.imul(4294967295,5)?function(a,b){return Math.imul(a,b)}:function(a,b){var c=a&65535,d=b&65535;return c*d+((a>>>16&65535)*d+c*(b>>>16&65535)<<16>>>0)|0};function dc(a){a=cc(a|0,-862048943);return cc(a<<15|a>>>-15,461845907)}function ec(a,b){var c=(a|0)^(b|0);return cc(c<<13|c>>>-13,5)+-430675100|0}function gc(a,b){var c=(a|0)^b,c=cc(c^c>>>16,-2048144789),c=cc(c^c>>>13,-1028477387);return c^c>>>16}
function hc(a){var b;a:{b=1;for(var c=0;;)if(b<a.length){var d=b+2,c=ec(c,dc(a.charCodeAt(b-1)|a.charCodeAt(b)<<16));b=d}else{b=c;break a}}b=1===(a.length&1)?b^dc(a.charCodeAt(a.length-1)):b;return gc(b,cc(2,a.length))}var ic={},jc=0;function kc(a){255<jc&&(ic={},jc=0);var b=ic[a];if("number"!==typeof b){a:if(null!=a)if(b=a.length,0<b)for(var c=0,d=0;;)if(c<b)var e=c+1,d=cc(31,d)+a.charCodeAt(c),c=e;else{b=d;break a}else b=0;else b=0;ic[a]=b;jc+=1}return a=b}
function lc(a){a&&(a.h&4194304||a.Rb)?a=a.D(null):"number"===typeof a?a=Math.floor(a)%2147483647:!0===a?a=1:!1===a?a=0:"string"===typeof a?(a=kc(a),0!==a&&(a=dc(a),a=ec(0,a),a=gc(a,4))):a=a instanceof Date?a.valueOf():null==a?0:Jb(a);return a}function mc(a,b){return a^b+2654435769+(a<<6)+(a>>2)}function nc(a,b,c,d,e){this.Ra=a;this.name=b;this.Fa=c;this.Ja=d;this.aa=e;this.h=2154168321;this.u=4096}g=nc.prototype;g.toString=function(){return this.Fa};g.equiv=function(a){return this.m(null,a)};
g.m=function(a,b){return b instanceof nc?this.Fa===b.Fa:!1};g.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return I.i(c,this,null);case 3:return I.i(c,this,d)}throw Error("Invalid arity: "+arguments.length);};a.c=function(a,c){return I.i(c,this,null)};a.i=function(a,c,d){return I.i(c,this,d)};return a}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};g.f=function(a){return I.i(a,this,null)};g.c=function(a,b){return I.i(a,this,b)};g.H=function(){return this.aa};
g.R=function(a,b){return new nc(this.Ra,this.name,this.Fa,this.Ja,b)};g.D=function(){var a=this.Ja;return null!=a?a:this.Ja=a=mc(hc(this.name),kc(this.Ra))};g.B=function(a,b){return J(b,this.Fa)};function M(a){if(null==a)return null;if(a&&(a.h&8388608||a.Sb))return a.P(null);if(hb(a)||"string"===typeof a)return 0===a.length?null:new N(a,0);if(x(Kb,a))return Lb(a);throw Error([C(a),C(" is not ISeqable")].join(""));}
function O(a){if(null==a)return null;if(a&&(a.h&64||a.Ya))return a.V(null);a=M(a);return null==a?null:F(a)}function oc(a){return null!=a?a&&(a.h&64||a.Ya)?a.$(null):(a=M(a))?H(a):pc:pc}function P(a){return null==a?null:a&&(a.h&128||a.Xa)?a.Z(null):M(oc(a))}var Q=function Q(){switch(arguments.length){case 1:return Q.f(arguments[0]);case 2:return Q.c(arguments[0],arguments[1]);default:return Q.w(arguments[0],arguments[1],new N(Array.prototype.slice.call(arguments,2),0))}};Q.f=function(){return!0};
Q.c=function(a,b){return null==a?null==b:a===b||Ib(a,b)};Q.w=function(a,b,c){for(;;)if(Q.c(a,b))if(P(c))a=b,b=O(c),c=P(c);else return Q.c(b,O(c));else return!1};Q.I=function(a){var b=O(a),c=P(a);a=O(c);c=P(c);return Q.w(b,a,c)};Q.S=2;function qc(a){this.s=a}qc.prototype.next=function(){if(null!=this.s){var a=O(this.s);this.s=P(this.s);return{value:a,done:!1}}return{value:null,done:!0}};function R(a){return new qc(M(a))}function rc(a,b){var c=dc(a),c=ec(0,c);return gc(c,b)}
function sc(a){var b=0,c=1;for(a=M(a);;)if(null!=a)b+=1,c=cc(31,c)+lc(O(a))|0,a=P(a);else return rc(c,b)}var tc=rc(1,0);function uc(a){var b=0,c=0;for(a=M(a);;)if(null!=a)b+=1,c=c+lc(O(a))|0,a=P(a);else return rc(c,b)}var vc=rc(0,0);lb["null"]=!0;mb["null"]=function(){return 0};Date.prototype.m=function(a,b){return b instanceof Date&&this.valueOf()===b.valueOf()};Ib.number=function(a,b){return a===b};kb["function"]=!0;Bb["function"]=!0;Cb["function"]=function(){return null};
Jb._=function(a){return a[fa]||(a[fa]=++ga)};function wc(a){return Ab(a)}function xc(a,b){var c=mb(a);if(0===c)return b.C?b.C():b.call(null);for(var d=E.c(a,0),e=1;;)if(e<c)var f=E.c(a,e),d=b.c?b.c(d,f):b.call(null,d,f),e=e+1;else return d}function yc(a,b,c){var d=mb(a),e=c;for(c=0;;)if(c<d){var f=E.c(a,c),e=b.c?b.c(e,f):b.call(null,e,f);c+=1}else return e}
function zc(a,b){var c=a.length;if(0===a.length)return b.C?b.C():b.call(null);for(var d=a[0],e=1;;)if(e<c)var f=a[e],d=b.c?b.c(d,f):b.call(null,d,f),e=e+1;else return d}function Ac(a,b,c){var d=a.length,e=c;for(c=0;;)if(c<d){var f=a[c],e=b.c?b.c(e,f):b.call(null,e,f);c+=1}else return e}function Bc(a,b,c,d){for(var e=a.length;;)if(d<e){var f=a[d];c=b.c?b.c(c,f):b.call(null,c,f);d+=1}else return c}function Cc(a){return a?a.h&2||a.wb?!0:a.h?!1:x(lb,a):x(lb,a)}function Dc(a,b){this.a=a;this.j=b}
Dc.prototype.nb=function(){return this.j<this.a.length};Dc.prototype.next=function(){var a=this.a[this.j];this.j+=1;return a};function N(a,b){this.a=a;this.j=b;this.h=166199550;this.u=8192}g=N.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.M=function(a,b){var c=b+this.j;return c<this.a.length?this.a[c]:null};g.ba=function(a,b,c){a=b+this.j;return a<this.a.length?this.a[a]:c};g.Wa=function(){return new Dc(this.a,this.j)};
g.Z=function(){return this.j+1<this.a.length?new N(this.a,this.j+1):null};g.X=function(){var a=this.a.length-this.j;return 0>a?0:a};g.D=function(){return sc(this)};g.m=function(a,b){return Ec.c?Ec.c(this,b):Ec.call(null,this,b)};g.T=function(a,b){return Bc(this.a,b,this.a[this.j],this.j+1)};g.U=function(a,b,c){return Bc(this.a,b,c,this.j)};g.V=function(){return this.a[this.j]};g.$=function(){return this.j+1<this.a.length?new N(this.a,this.j+1):pc};g.P=function(){return this.j<this.a.length?this:null};
g.K=function(a,b){return T.c?T.c(b,this):T.call(null,b,this)};N.prototype[jb]=function(){return R(this)};function Fc(a,b){return b<a.length?new N(a,b):null}function Hc(){switch(arguments.length){case 1:return Fc(arguments[0],0);case 2:return Fc(arguments[0],arguments[1]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}}Ib._=function(a,b){return a===b};
var Ic=function Ic(){switch(arguments.length){case 0:return Ic.C();case 1:return Ic.f(arguments[0]);case 2:return Ic.c(arguments[0],arguments[1]);default:return Ic.w(arguments[0],arguments[1],new N(Array.prototype.slice.call(arguments,2),0))}};Ic.C=function(){return Jc};Ic.f=function(a){return a};Ic.c=function(a,b){return null!=a?ob(a,b):ob(pc,b)};Ic.w=function(a,b,c){for(;;)if(w(c))a=Ic.c(a,b),b=O(c),c=P(c);else return Ic.c(a,b)};Ic.I=function(a){var b=O(a),c=P(a);a=O(c);c=P(c);return Ic.w(b,a,c)};
Ic.S=2;function U(a){if(null!=a)if(a&&(a.h&2||a.wb))a=a.X(null);else if(hb(a))a=a.length;else if("string"===typeof a)a=a.length;else if(x(lb,a))a=mb(a);else a:{a=M(a);for(var b=0;;){if(Cc(a)){a=b+mb(a);break a}a=P(a);b+=1}}else a=0;return a}function Kc(a,b){for(var c=null;;){if(null==a)return c;if(0===b)return M(a)?O(a):c;var d=a;if(d?d.h&16||d.zb||(d.h?0:x(pb,d)):x(pb,d))return E.i(a,b,c);if(M(a)){var d=P(a),e=b-1;a=d;b=e}else return c}}
function Lc(a,b){if("number"!==typeof b)throw Error("index argument to nth must be a number.");if(null==a)return null;if(a&&(a.h&16||a.zb))return a.ba(null,b,null);if(hb(a)||"string"===typeof a)return b<a.length?a[b]:null;if(x(pb,a))return E.c(a,b);if(a?a.h&64||a.Ya||(a.h?0:x(qb,a)):x(qb,a))return Kc(a,b);throw Error([C("nth not supported on this type "),C(ib(null==a?null:a.constructor))].join(""));}
function Mc(a,b){return null==a?null:a&&(a.h&256||a.Ab)?a.N(null,b):hb(a)?b<a.length?a[b|0]:null:"string"===typeof a?b<a.length?a[b|0]:null:x(sb,a)?I.c(a,b):null}function Nc(a,b,c){return null!=a?a&&(a.h&256||a.Ab)?a.F(null,b,c):hb(a)?b<a.length?a[b]:c:"string"===typeof a?b<a.length?a[b]:c:x(sb,a)?I.i(a,b,c):c:c}
var Oc=function Oc(){switch(arguments.length){case 3:return Oc.i(arguments[0],arguments[1],arguments[2]);default:return Oc.w(arguments[0],arguments[1],arguments[2],new N(Array.prototype.slice.call(arguments,3),0))}};Oc.i=function(a,b,c){if(null!=a)a=tb(a,b,c);else a:{a=[b];c=[c];b=a.length;var d=0,e;for(e=Qb(Pc);;)if(d<b){var f=d+1;e=e.Oa(null,a[d],c[d]);d=f}else{a=Sb(e);break a}}return a};Oc.w=function(a,b,c,d){for(;;)if(a=Oc.i(a,b,c),w(d))b=O(d),c=O(P(d)),d=P(P(d));else return a};
Oc.I=function(a){var b=O(a),c=P(a);a=O(c);var d=P(c),c=O(d),d=P(d);return Oc.w(b,a,c,d)};Oc.S=3;function Qc(a){var b="function"==r(a);return w(b)?b:a?w(w(null)?null:a.vb)?!0:a.Xb?!1:x(kb,a):x(kb,a)}function Rc(a,b){this.b=a;this.o=b;this.h=393217;this.u=0}g=Rc.prototype;g.H=function(){return this.o};g.R=function(a,b){return new Rc(this.b,b)};g.vb=!0;
g.call=function(){function a(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G,K,ba){a=this.b;return Sc.Va?Sc.Va(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G,K,ba):Sc.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G,K,ba)}function b(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G,K){a=this;return a.b.va?a.b.va(b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G,K):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G,K)}function c(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G){a=this;return a.b.ua?a.b.ua(b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,
G):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y,G)}function d(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y){a=this;return a.b.ta?a.b.ta(b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,y)}function e(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B){a=this;return a.b.sa?a.b.sa(b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B)}function f(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z){a=this;return a.b.ra?a.b.ra(b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z):a.b.call(null,
b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z)}function h(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v){a=this;return a.b.qa?a.b.qa(b,c,d,e,f,h,k,l,m,n,p,q,t,u,v):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v)}function k(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u){a=this;return a.b.pa?a.b.pa(b,c,d,e,f,h,k,l,m,n,p,q,t,u):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q,t,u)}function l(a,b,c,d,e,f,h,k,l,m,n,p,q,t){a=this;return a.b.oa?a.b.oa(b,c,d,e,f,h,k,l,m,n,p,q,t):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q,t)}function m(a,b,c,d,e,f,h,k,l,m,n,p,q){a=this;
return a.b.na?a.b.na(b,c,d,e,f,h,k,l,m,n,p,q):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p,q)}function n(a,b,c,d,e,f,h,k,l,m,n,p){a=this;return a.b.ma?a.b.ma(b,c,d,e,f,h,k,l,m,n,p):a.b.call(null,b,c,d,e,f,h,k,l,m,n,p)}function p(a,b,c,d,e,f,h,k,l,m,n){a=this;return a.b.la?a.b.la(b,c,d,e,f,h,k,l,m,n):a.b.call(null,b,c,d,e,f,h,k,l,m,n)}function q(a,b,c,d,e,f,h,k,l,m){a=this;return a.b.za?a.b.za(b,c,d,e,f,h,k,l,m):a.b.call(null,b,c,d,e,f,h,k,l,m)}function t(a,b,c,d,e,f,h,k,l){a=this;return a.b.ya?a.b.ya(b,c,
d,e,f,h,k,l):a.b.call(null,b,c,d,e,f,h,k,l)}function u(a,b,c,d,e,f,h,k){a=this;return a.b.xa?a.b.xa(b,c,d,e,f,h,k):a.b.call(null,b,c,d,e,f,h,k)}function v(a,b,c,d,e,f,h){a=this;return a.b.wa?a.b.wa(b,c,d,e,f,h):a.b.call(null,b,c,d,e,f,h)}function z(a,b,c,d,e,f){a=this;return a.b.L?a.b.L(b,c,d,e,f):a.b.call(null,b,c,d,e,f)}function B(a,b,c,d,e){a=this;return a.b.A?a.b.A(b,c,d,e):a.b.call(null,b,c,d,e)}function G(a,b,c,d){a=this;return a.b.i?a.b.i(b,c,d):a.b.call(null,b,c,d)}function K(a,b,c){a=this;
return a.b.c?a.b.c(b,c):a.b.call(null,b,c)}function ba(a,b){a=this;return a.b.f?a.b.f(b):a.b.call(null,b)}function Ca(a){a=this;return a.b.C?a.b.C():a.b.call(null)}var y=null,y=function(y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db,nb,Fb,fc,Gc,gd,te,pf){switch(arguments.length){case 1:return Ca.call(this,y);case 2:return ba.call(this,y,S);case 3:return K.call(this,y,S,V);case 4:return G.call(this,y,S,V,Y);case 5:return B.call(this,y,S,V,Y,aa);case 6:return z.call(this,y,S,V,Y,aa,ea);case 7:return v.call(this,
y,S,V,Y,aa,ea,ja);case 8:return u.call(this,y,S,V,Y,aa,ea,ja,ka);case 9:return t.call(this,y,S,V,Y,aa,ea,ja,ka,oa);case 10:return q.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa);case 11:return p.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa);case 12:return n.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba);case 13:return m.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma);case 14:return l.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta);case 15:return k.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db);case 16:return h.call(this,
y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db,nb);case 17:return f.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db,nb,Fb);case 18:return e.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db,nb,Fb,fc);case 19:return d.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db,nb,Fb,fc,Gc);case 20:return c.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db,nb,Fb,fc,Gc,gd);case 21:return b.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,wa,Ba,Ma,Ta,db,nb,Fb,fc,Gc,gd,te);case 22:return a.call(this,y,S,V,Y,aa,ea,ja,ka,oa,sa,
wa,Ba,Ma,Ta,db,nb,Fb,fc,Gc,gd,te,pf)}throw Error("Invalid arity: "+arguments.length);};y.f=Ca;y.c=ba;y.i=K;y.A=G;y.L=B;y.wa=z;y.xa=v;y.ya=u;y.za=t;y.la=q;y.ma=p;y.na=n;y.oa=m;y.pa=l;y.qa=k;y.ra=h;y.sa=f;y.ta=e;y.ua=d;y.va=c;y.yb=b;y.Va=a;return y}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};g.C=function(){return this.b.C?this.b.C():this.b.call(null)};g.f=function(a){return this.b.f?this.b.f(a):this.b.call(null,a)};
g.c=function(a,b){return this.b.c?this.b.c(a,b):this.b.call(null,a,b)};g.i=function(a,b,c){return this.b.i?this.b.i(a,b,c):this.b.call(null,a,b,c)};g.A=function(a,b,c,d){return this.b.A?this.b.A(a,b,c,d):this.b.call(null,a,b,c,d)};g.L=function(a,b,c,d,e){return this.b.L?this.b.L(a,b,c,d,e):this.b.call(null,a,b,c,d,e)};g.wa=function(a,b,c,d,e,f){return this.b.wa?this.b.wa(a,b,c,d,e,f):this.b.call(null,a,b,c,d,e,f)};
g.xa=function(a,b,c,d,e,f,h){return this.b.xa?this.b.xa(a,b,c,d,e,f,h):this.b.call(null,a,b,c,d,e,f,h)};g.ya=function(a,b,c,d,e,f,h,k){return this.b.ya?this.b.ya(a,b,c,d,e,f,h,k):this.b.call(null,a,b,c,d,e,f,h,k)};g.za=function(a,b,c,d,e,f,h,k,l){return this.b.za?this.b.za(a,b,c,d,e,f,h,k,l):this.b.call(null,a,b,c,d,e,f,h,k,l)};g.la=function(a,b,c,d,e,f,h,k,l,m){return this.b.la?this.b.la(a,b,c,d,e,f,h,k,l,m):this.b.call(null,a,b,c,d,e,f,h,k,l,m)};
g.ma=function(a,b,c,d,e,f,h,k,l,m,n){return this.b.ma?this.b.ma(a,b,c,d,e,f,h,k,l,m,n):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n)};g.na=function(a,b,c,d,e,f,h,k,l,m,n,p){return this.b.na?this.b.na(a,b,c,d,e,f,h,k,l,m,n,p):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p)};g.oa=function(a,b,c,d,e,f,h,k,l,m,n,p,q){return this.b.oa?this.b.oa(a,b,c,d,e,f,h,k,l,m,n,p,q):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q)};
g.pa=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t){return this.b.pa?this.b.pa(a,b,c,d,e,f,h,k,l,m,n,p,q,t):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t)};g.qa=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u){return this.b.qa?this.b.qa(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u)};g.ra=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v){return this.b.ra?this.b.ra(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v)};
g.sa=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z){return this.b.sa?this.b.sa(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z)};g.ta=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B){return this.b.ta?this.b.ta(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B)};
g.ua=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G){return this.b.ua?this.b.ua(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G)};g.va=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K){return this.b.va?this.b.va(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K):this.b.call(null,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K)};
g.yb=function(a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba){var Ca=this.b;return Sc.Va?Sc.Va(Ca,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba):Sc.call(null,Ca,a,b,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba)};function Tc(a){var b=null!=a;return(b?a?a.h&131072||a.Db||(a.h?0:x(Bb,a)):x(Bb,a):b)?Cb(a):null}function Uc(a){return null==a?!1:a?a.h&1024||a.Bb?!0:a.h?!1:x(ub,a):x(ub,a)}function Vc(a){return a?a.h&16384||a.Ub?!0:a.h?!1:x(yb,a):x(yb,a)}function Wc(a){return a?a.u&512||a.Pb?!0:!1:!1}
function Xc(a){var b=[];va(a,function(a,b){return function(a,c){return b.push(c)}}(a,b));return b}function Yc(a,b,c,d,e){for(;0!==e;)c[d]=a[b],d+=1,--e,b+=1}var Zc={};function $c(a){return w(a)?!0:!1}function ad(a,b){var c=M(b);if(c){var d=O(c),c=P(c);return bd?bd(a,d,c):cd.call(null,a,d,c)}return a.C?a.C():a.call(null)}function dd(a,b,c){for(c=M(c);;)if(c){var d=O(c);b=a.c?a.c(b,d):a.call(null,b,d);c=P(c)}else return b}
function cd(){switch(arguments.length){case 2:var a=arguments[0],b=arguments[1];return b&&(b.h&524288||b.Fb)?b.T(null,a):hb(b)?zc(b,a):"string"===typeof b?zc(b,a):x(Gb,b)?Hb.c(b,a):ad(a,b);case 3:return bd(arguments[0],arguments[1],arguments[2]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}}function bd(a,b,c){return c&&(c.h&524288||c.Fb)?c.U(null,a,b):hb(c)?Ac(c,a,b):"string"===typeof c?Ac(c,a,b):x(Gb,c)?Hb.i(c,a,b):dd(a,b,c)}function ed(a){return a}
function fd(a){a=(a-a%2)/2;return 0<=a?Math.floor(a):Math.ceil(a)}function hd(a){a-=a>>1&1431655765;a=(a&858993459)+(a>>2&858993459);return 16843009*(a+(a>>4)&252645135)>>24}var C=function C(){switch(arguments.length){case 0:return C.C();case 1:return C.f(arguments[0]);default:return C.w(arguments[0],new N(Array.prototype.slice.call(arguments,1),0))}};C.C=function(){return""};C.f=function(a){return null==a?"":ia(a)};
C.w=function(a,b){for(var c=new Wa(""+C(a)),d=b;;)if(w(d))c=c.append(""+C(O(d))),d=P(d);else return c.toString()};C.I=function(a){var b=O(a);a=P(a);return C.w(b,a)};C.S=1;function Ec(a,b){var c;if(b?b.h&16777216||b.Tb||(b.h?0:x(Mb,b)):x(Mb,b))if(Cc(a)&&Cc(b)&&U(a)!==U(b))c=!1;else a:{c=M(a);for(var d=M(b);;){if(null==c){c=null==d;break a}if(null!=d&&Q.c(O(c),O(d)))c=P(c),d=P(d);else{c=!1;break a}}}else c=null;return $c(c)}
function id(a,b,c,d,e){this.o=a;this.first=b;this.Aa=c;this.count=d;this.l=e;this.h=65937646;this.u=8192}g=id.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.o};g.Z=function(){return 1===this.count?null:this.Aa};g.X=function(){return this.count};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){return this.first};
g.$=function(){return 1===this.count?pc:this.Aa};g.P=function(){return this};g.R=function(a,b){return new id(b,this.first,this.Aa,this.count,this.l)};g.K=function(a,b){return new id(this.o,b,this,this.count+1,null)};id.prototype[jb]=function(){return R(this)};function jd(a){this.o=a;this.h=65937614;this.u=8192}g=jd.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.o};g.Z=function(){return null};g.X=function(){return 0};g.D=function(){return tc};
g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){return null};g.$=function(){return pc};g.P=function(){return null};g.R=function(a,b){return new jd(b)};g.K=function(a,b){return new id(this.o,b,null,1,null)};var pc=new jd(null);jd.prototype[jb]=function(){return R(this)};
function kd(){a:{var a=0<arguments.length?new N(Array.prototype.slice.call(arguments,0),0):null,b;if(a instanceof N&&0===a.j)b=a.a;else b:for(b=[];;)if(null!=a)b.push(a.V(null)),a=a.Z(null);else break b;for(var a=b.length,c=pc;;)if(0<a)var d=a-1,c=c.K(null,b[a-1]),a=d;else break a}return c}function ld(a,b,c,d){this.o=a;this.first=b;this.Aa=c;this.l=d;this.h=65929452;this.u=8192}g=ld.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.o};
g.Z=function(){return null==this.Aa?null:M(this.Aa)};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){return this.first};g.$=function(){return null==this.Aa?pc:this.Aa};g.P=function(){return this};g.R=function(a,b){return new ld(b,this.first,this.Aa,this.l)};g.K=function(a,b){return new ld(null,b,this,this.l)};ld.prototype[jb]=function(){return R(this)};
function T(a,b){var c=null==b;return(c?c:b&&(b.h&64||b.Ya))?new ld(null,a,b,null):new ld(null,a,M(b),null)}function W(a,b,c,d){this.Ra=a;this.name=b;this.Da=c;this.Ja=d;this.h=2153775105;this.u=4096}g=W.prototype;g.toString=function(){return[C(":"),C(this.Da)].join("")};g.equiv=function(a){return this.m(null,a)};g.m=function(a,b){return b instanceof W?this.Da===b.Da:!1};
g.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return Mc(c,this);case 3:return Nc(c,this,d)}throw Error("Invalid arity: "+arguments.length);};a.c=function(a,c){return Mc(c,this)};a.i=function(a,c,d){return Nc(c,this,d)};return a}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};g.f=function(a){return Mc(a,this)};g.c=function(a,b){return Nc(a,this,b)};
g.D=function(){var a=this.Ja;return null!=a?a:this.Ja=a=mc(hc(this.name),kc(this.Ra))+2654435769|0};g.B=function(a,b){return J(b,[C(":"),C(this.Da)].join(""))};var md=function md(){switch(arguments.length){case 1:return md.f(arguments[0]);case 2:return md.c(arguments[0],arguments[1]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}};
md.f=function(a){if(a instanceof W)return a;if(a instanceof nc){var b;if(a&&(a.u&4096||a.Eb))b=a.Ra;else throw Error([C("Doesn't support namespace: "),C(a)].join(""));return new W(b,nd.f?nd.f(a):nd.call(null,a),a.Fa,null)}return"string"===typeof a?(b=a.split("/"),2===b.length?new W(b[0],b[1],a,null):new W(null,b[0],a,null)):null};md.c=function(a,b){return new W(a,b,[C(w(a)?[C(a),C("/")].join(""):null),C(b)].join(""),null)};md.S=2;
function od(a,b,c,d){this.o=a;this.La=b;this.s=c;this.l=d;this.h=32374988;this.u=0}g=od.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};function pd(a){null!=a.La&&(a.s=a.La.C?a.La.C():a.La.call(null),a.La=null);return a.s}g.H=function(){return this.o};g.Z=function(){Lb(this);return null==this.s?null:P(this.s)};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};
g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){Lb(this);return null==this.s?null:O(this.s)};g.$=function(){Lb(this);return null!=this.s?oc(this.s):pc};g.P=function(){pd(this);if(null==this.s)return null;for(var a=this.s;;)if(a instanceof od)a=pd(a);else return this.s=a,M(this.s)};g.R=function(a,b){return new od(b,this.La,this.s,this.l)};g.K=function(a,b){return T(b,this)};od.prototype[jb]=function(){return R(this)};function qd(a,b){this.cb=a;this.end=b;this.h=2;this.u=0}
qd.prototype.add=function(a){this.cb[this.end]=a;return this.end+=1};qd.prototype.ka=function(){var a=new rd(this.cb,0,this.end);this.cb=null;return a};qd.prototype.X=function(){return this.end};function rd(a,b,c){this.a=a;this.J=b;this.end=c;this.h=524306;this.u=0}g=rd.prototype;g.X=function(){return this.end-this.J};g.M=function(a,b){return this.a[this.J+b]};g.ba=function(a,b,c){return 0<=b&&b<this.end-this.J?this.a[this.J+b]:c};
g.pb=function(){if(this.J===this.end)throw Error("-drop-first of empty chunk");return new rd(this.a,this.J+1,this.end)};g.T=function(a,b){return Bc(this.a,b,this.a[this.J],this.J+1)};g.U=function(a,b,c){return Bc(this.a,b,c,this.J)};function sd(a,b,c,d){this.ka=a;this.ia=b;this.o=c;this.l=d;this.h=31850732;this.u=1536}g=sd.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.o};
g.Z=function(){if(1<mb(this.ka))return new sd(Vb(this.ka),this.ia,this.o,null);var a=Lb(this.ia);return null==a?null:a};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.V=function(){return E.c(this.ka,0)};g.$=function(){return 1<mb(this.ka)?new sd(Vb(this.ka),this.ia,this.o,null):null==this.ia?pc:this.ia};g.P=function(){return this};g.hb=function(){return this.ka};g.ib=function(){return null==this.ia?pc:this.ia};
g.R=function(a,b){return new sd(this.ka,this.ia,b,this.l)};g.K=function(a,b){return T(b,this)};g.gb=function(){return null==this.ia?null:this.ia};sd.prototype[jb]=function(){return R(this)};function td(a,b){return 0===mb(a)?b:new sd(a,b,null,null)}function ud(a,b){a.add(b)}function vd(a){for(var b=[];;)if(M(a))b.push(O(a)),a=P(a);else return b}function wd(a,b){if(Cc(a))return U(a);for(var c=a,d=b,e=0;;)if(0<d&&M(c))c=P(c),--d,e+=1;else return e}
var xd=function xd(b){return null==b?null:null==P(b)?M(O(b)):T(O(b),xd(P(b)))};
function yd(a,b,c){var d=M(c);if(0===b)return a.C?a.C():a.call(null);c=F(d);var e=H(d);if(1===b)return a.f?a.f(c):a.f?a.f(c):a.call(null,c);var d=F(e),f=H(e);if(2===b)return a.c?a.c(c,d):a.c?a.c(c,d):a.call(null,c,d);var e=F(f),h=H(f);if(3===b)return a.i?a.i(c,d,e):a.i?a.i(c,d,e):a.call(null,c,d,e);var f=F(h),k=H(h);if(4===b)return a.A?a.A(c,d,e,f):a.A?a.A(c,d,e,f):a.call(null,c,d,e,f);var h=F(k),l=H(k);if(5===b)return a.L?a.L(c,d,e,f,h):a.L?a.L(c,d,e,f,h):a.call(null,c,d,e,f,h);var k=F(l),m=H(l);
if(6===b)return a.wa?a.wa(c,d,e,f,h,k):a.wa?a.wa(c,d,e,f,h,k):a.call(null,c,d,e,f,h,k);var l=F(m),n=H(m);if(7===b)return a.xa?a.xa(c,d,e,f,h,k,l):a.xa?a.xa(c,d,e,f,h,k,l):a.call(null,c,d,e,f,h,k,l);var m=F(n),p=H(n);if(8===b)return a.ya?a.ya(c,d,e,f,h,k,l,m):a.ya?a.ya(c,d,e,f,h,k,l,m):a.call(null,c,d,e,f,h,k,l,m);var n=F(p),q=H(p);if(9===b)return a.za?a.za(c,d,e,f,h,k,l,m,n):a.za?a.za(c,d,e,f,h,k,l,m,n):a.call(null,c,d,e,f,h,k,l,m,n);var p=F(q),t=H(q);if(10===b)return a.la?a.la(c,d,e,f,h,k,l,m,n,
p):a.la?a.la(c,d,e,f,h,k,l,m,n,p):a.call(null,c,d,e,f,h,k,l,m,n,p);var q=F(t),u=H(t);if(11===b)return a.ma?a.ma(c,d,e,f,h,k,l,m,n,p,q):a.ma?a.ma(c,d,e,f,h,k,l,m,n,p,q):a.call(null,c,d,e,f,h,k,l,m,n,p,q);var t=F(u),v=H(u);if(12===b)return a.na?a.na(c,d,e,f,h,k,l,m,n,p,q,t):a.na?a.na(c,d,e,f,h,k,l,m,n,p,q,t):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t);var u=F(v),z=H(v);if(13===b)return a.oa?a.oa(c,d,e,f,h,k,l,m,n,p,q,t,u):a.oa?a.oa(c,d,e,f,h,k,l,m,n,p,q,t,u):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u);var v=F(z),
B=H(z);if(14===b)return a.pa?a.pa(c,d,e,f,h,k,l,m,n,p,q,t,u,v):a.pa?a.pa(c,d,e,f,h,k,l,m,n,p,q,t,u,v):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u,v);var z=F(B),G=H(B);if(15===b)return a.qa?a.qa(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z):a.qa?a.qa(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z);var B=F(G),K=H(G);if(16===b)return a.ra?a.ra(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B):a.ra?a.ra(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B);var G=F(K),ba=H(K);if(17===b)return a.sa?
a.sa(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G):a.sa?a.sa(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G);var K=F(ba),Ca=H(ba);if(18===b)return a.ta?a.ta(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K):a.ta?a.ta(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K);ba=F(Ca);Ca=H(Ca);if(19===b)return a.ua?a.ua(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba):a.ua?a.ua(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba);var y=
F(Ca);H(Ca);if(20===b)return a.va?a.va(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba,y):a.va?a.va(c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba,y):a.call(null,c,d,e,f,h,k,l,m,n,p,q,t,u,v,z,B,G,K,ba,y);throw Error("Only up to 20 arguments supported on functions");}
function Sc(){switch(arguments.length){case 2:return zd(arguments[0],arguments[1]);case 3:return Ad(arguments[0],arguments[1],arguments[2]);case 4:var a;a=arguments[0];var b=T(arguments[1],T(arguments[2],arguments[3])),c=a.S;if(a.I){var d=wd(b,c+1);a=d<=c?yd(a,d,b):a.I(b)}else a=a.apply(a,vd(b));return a;case 5:return Bd(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);default:return a=arguments[0],b=T(arguments[1],T(arguments[2],T(arguments[3],T(arguments[4],xd(new N(Array.prototype.slice.call(arguments,
5),0)))))),c=a.S,a.I?(d=wd(b,c+1),a=d<=c?yd(a,d,b):a.I(b)):a=a.apply(a,vd(b)),a}}function zd(a,b){var c=a.S;if(a.I){var d=wd(b,c+1);return d<=c?yd(a,d,b):a.I(b)}return a.apply(a,vd(b))}function Ad(a,b,c){b=T(b,c);c=a.S;if(a.I){var d=wd(b,c+1);return d<=c?yd(a,d,b):a.I(b)}return a.apply(a,vd(b))}function Bd(a,b,c,d,e){b=T(b,T(c,T(d,e)));c=a.S;return a.I?(d=wd(b,c+1),d<=c?yd(a,d,b):a.I(b)):a.apply(a,vd(b))}
function Cd(a,b){for(;;){if(null==M(b))return!0;var c;c=O(b);c=a.f?a.f(c):a.call(null,c);if(w(c)){c=a;var d=P(b);a=c;b=d}else return!1}}function Dd(a,b,c,d){this.state=a;this.o=b;this.Ob=c;this.ub=d;this.u=16386;this.h=6455296}g=Dd.prototype;g.equiv=function(a){return this.m(null,a)};g.m=function(a,b){return this===b};g.xb=function(){return this.state};g.H=function(){return this.o};
g.rb=function(a,b,c){for(var d=M(this.ub),e=null,f=0,h=0;;)if(h<f){a=e.M(null,h);var k=Lc(a,0);a=Lc(a,1);var l=b,m=c;a.A?a.A(k,this,l,m):a.call(null,k,this,l,m);h+=1}else if(a=M(d))d=a,Wc(d)?(e=Wb(d),d=Xb(d),a=e,f=U(e),e=a):(a=O(d),k=Lc(a,0),a=Lc(a,1),e=k,f=b,h=c,a.A?a.A(e,this,f,h):a.call(null,e,this,f,h),d=P(d),e=null,f=0),h=0;else return null};g.D=function(){return this[fa]||(this[fa]=++ga)};
function Ed(){switch(arguments.length){case 1:return Fd(arguments[0]);default:var a=arguments[0],b=new N(Array.prototype.slice.call(arguments,1),0),c=b,c=(null==c?0:c?c.h&64||c.Ya||(c.h?0:x(qb,c)):x(qb,c))?zd(Gd,b):b,b=Mc(c,eb),c=Mc(c,Hd);return new Dd(a,b,c,null)}}function Fd(a){return new Dd(a,null,null,null)}
function Id(a,b){if(a instanceof Dd){var c=a.Ob;if(null!=c&&!w(c.f?c.f(b):c.call(null,b)))throw Error([C("Assert failed: "),C("Validator rejected reference state"),C("\n"),C(function(){var a=kd(new nc(null,"validate","validate",1439230700,null),new nc(null,"new-value","new-value",-1567397401,null));return Jd.f?Jd.f(a):Jd.call(null,a)}())].join(""));c=a.state;a.state=b;null!=a.ub&&Pb(a,c,b);return b}return Zb(a,b)}
var Kd=function Kd(){switch(arguments.length){case 2:return Kd.c(arguments[0],arguments[1]);case 3:return Kd.i(arguments[0],arguments[1],arguments[2]);case 4:return Kd.A(arguments[0],arguments[1],arguments[2],arguments[3]);default:return Kd.w(arguments[0],arguments[1],arguments[2],arguments[3],new N(Array.prototype.slice.call(arguments,4),0))}};Kd.c=function(a,b){var c;a instanceof Dd?(c=a.state,c=b.f?b.f(c):b.call(null,c),c=Id(a,c)):c=L.c(a,b);return c};
Kd.i=function(a,b,c){if(a instanceof Dd){var d=a.state;b=b.c?b.c(d,c):b.call(null,d,c);a=Id(a,b)}else a=L.i(a,b,c);return a};Kd.A=function(a,b,c,d){if(a instanceof Dd){var e=a.state;b=b.i?b.i(e,c,d):b.call(null,e,c,d);a=Id(a,b)}else a=L.A(a,b,c,d);return a};Kd.w=function(a,b,c,d,e){return a instanceof Dd?Id(a,Bd(b,a.state,c,d,e)):L.L(a,b,c,d,e)};Kd.I=function(a){var b=O(a),c=P(a);a=O(c);var d=P(c),c=O(d),e=P(d),d=O(e),e=P(e);return Kd.w(b,a,c,d,e)};Kd.S=4;
var X=function X(){switch(arguments.length){case 1:return X.f(arguments[0]);case 2:return X.c(arguments[0],arguments[1]);case 3:return X.i(arguments[0],arguments[1],arguments[2]);case 4:return X.A(arguments[0],arguments[1],arguments[2],arguments[3]);default:return X.w(arguments[0],arguments[1],arguments[2],arguments[3],new N(Array.prototype.slice.call(arguments,4),0))}};
X.f=function(a){return function(b){return function(){function c(c,d){var e=a.f?a.f(d):a.call(null,d);return b.c?b.c(c,e):b.call(null,c,e)}function d(a){return b.f?b.f(a):b.call(null,a)}function e(){return b.C?b.C():b.call(null)}var f=null,h=function(){function c(a,b,e){var f=null;if(2<arguments.length){for(var f=0,h=Array(arguments.length-2);f<h.length;)h[f]=arguments[f+2],++f;f=new N(h,0)}return d.call(this,a,b,f)}function d(c,e,f){e=Ad(a,e,f);return b.c?b.c(c,e):b.call(null,c,e)}c.S=2;c.I=function(a){var b=
O(a);a=P(a);var c=O(a);a=oc(a);return d(b,c,a)};c.w=d;return c}(),f=function(a,b,f){switch(arguments.length){case 0:return e.call(this);case 1:return d.call(this,a);case 2:return c.call(this,a,b);default:var n=null;if(2<arguments.length){for(var n=0,p=Array(arguments.length-2);n<p.length;)p[n]=arguments[n+2],++n;n=new N(p,0)}return h.w(a,b,n)}throw Error("Invalid arity: "+arguments.length);};f.S=2;f.I=h.I;f.C=e;f.f=d;f.c=c;f.w=h.w;return f}()}};
X.c=function(a,b){return new od(null,function(){var c=M(b);if(c){if(Wc(c)){for(var d=Wb(c),e=U(d),f=new qd(Array(e),0),h=0;;)if(h<e)ud(f,function(){var b=E.c(d,h);return a.f?a.f(b):a.call(null,b)}()),h+=1;else break;return td(f.ka(),X.c(a,Xb(c)))}return T(function(){var b=O(c);return a.f?a.f(b):a.call(null,b)}(),X.c(a,oc(c)))}return null},null,null)};
X.i=function(a,b,c){return new od(null,function(){var d=M(b),e=M(c);if(d&&e){var f=T,h;h=O(d);var k=O(e);h=a.c?a.c(h,k):a.call(null,h,k);d=f(h,X.i(a,oc(d),oc(e)))}else d=null;return d},null,null)};X.A=function(a,b,c,d){return new od(null,function(){var e=M(b),f=M(c),h=M(d);if(e&&f&&h){var k=T,l;l=O(e);var m=O(f),n=O(h);l=a.i?a.i(l,m,n):a.call(null,l,m,n);e=k(l,X.A(a,oc(e),oc(f),oc(h)))}else e=null;return e},null,null)};
X.w=function(a,b,c,d,e){var f=function k(a){return new od(null,function(){var b=X.c(M,a);return Cd(ed,b)?T(X.c(O,b),k(X.c(oc,b))):null},null,null)};return X.c(function(){return function(b){return zd(a,b)}}(f),f(Ic.w(e,d,Hc([c,b],0))))};X.I=function(a){var b=O(a),c=P(a);a=O(c);var d=P(c),c=O(d),e=P(d),d=O(e),e=P(e);return X.w(b,a,c,d,e)};X.S=4;function Ld(a,b){this.v=a;this.a=b}
function Md(a){return new Ld(a,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null])}function Nd(a){a=a.g;return 32>a?0:a-1>>>5<<5}function Od(a,b,c){for(;;){if(0===b)return c;var d=Md(a);d.a[0]=c;c=d;b-=5}}var Pd=function Pd(b,c,d,e){var f=new Ld(d.v,D(d.a)),h=b.g-1>>>c&31;5===c?f.a[h]=e:(d=d.a[h],b=null!=d?Pd(b,c-5,d,e):Od(null,c-5,e),f.a[h]=b);return f};
function Qd(a,b){throw Error([C("No item "),C(a),C(" in vector of length "),C(b)].join(""));}function Rd(a,b){if(b>=Nd(a))return a.Y;for(var c=a.root,d=a.shift;;)if(0<d)var e=d-5,c=c.a[b>>>d&31],d=e;else return c.a}function Sd(a,b){return 0<=b&&b<a.g?Rd(a,b):Qd(b,a.g)}var Td=function Td(b,c,d,e,f){var h=new Ld(d.v,D(d.a));if(0===c)h.a[e&31]=f;else{var k=e>>>c&31;b=Td(b,c-5,d.a[k],e,f);h.a[k]=b}return h};function Ud(a,b,c,d,e,f){this.j=a;this.Ta=b;this.a=c;this.Ba=d;this.start=e;this.end=f}
Ud.prototype.nb=function(){return this.j<this.end};Ud.prototype.next=function(){32===this.j-this.Ta&&(this.a=Rd(this.Ba,this.j),this.Ta+=32);var a=this.a[this.j&31];this.j+=1;return a};function Vd(a,b,c,d,e,f){this.o=a;this.g=b;this.shift=c;this.root=d;this.Y=e;this.l=f;this.h=167668511;this.u=8196}g=Vd.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.N=function(a,b){return I.i(this,b,null)};g.F=function(a,b,c){return"number"===typeof b?E.i(this,b,c):c};
g.M=function(a,b){return Sd(this,b)[b&31]};g.ba=function(a,b,c){return 0<=b&&b<this.g?Rd(this,b)[b&31]:c};g.lb=function(a,b,c){if(0<=b&&b<this.g)return Nd(this)<=b?(a=D(this.Y),a[b&31]=c,new Vd(this.o,this.g,this.shift,this.root,a,null)):new Vd(this.o,this.g,this.shift,Td(this,this.shift,this.root,b,c),this.Y,null);if(b===this.g)return ob(this,c);throw Error([C("Index "),C(b),C(" out of bounds  [0,"),C(this.g),C("]")].join(""));};
g.Wa=function(){var a=this.g;return new Ud(0,0,0<U(this)?Rd(this,0):null,this,0,a)};g.H=function(){return this.o};g.X=function(){return this.g};g.jb=function(){return E.c(this,0)};g.kb=function(){return E.c(this,1)};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){if(b instanceof Vd)if(this.g===U(b))for(var c=$b(this),d=$b(b);;)if(w(c.nb())){var e=c.next(),f=d.next();if(!Q.c(e,f))return!1}else return!0;else return!1;else return Ec(this,b)};
g.Ua=function(){var a=this;return new Wd(a.g,a.shift,function(){var b=a.root;return Xd.f?Xd.f(b):Xd.call(null,b)}(),function(){var b=a.Y;return Yd.f?Yd.f(b):Yd.call(null,b)}())};g.T=function(a,b){return xc(this,b)};g.U=function(a,b,c){a=0;for(var d=c;;)if(a<this.g){var e=Rd(this,a);c=e.length;a:for(var f=0;;)if(f<c)var h=e[f],d=b.c?b.c(d,h):b.call(null,d,h),f=f+1;else{e=d;break a}a+=c;d=e}else return d};
g.Na=function(a,b,c){if("number"===typeof b)return zb(this,b,c);throw Error("Vector's key for assoc must be a number.");};g.P=function(){if(0===this.g)return null;if(32>=this.g)return new N(this.Y,0);var a;a:{a=this.root;for(var b=this.shift;;)if(0<b)b-=5,a=a.a[0];else{a=a.a;break a}}return Zd?Zd(this,a,0,0):$d.call(null,this,a,0,0)};g.R=function(a,b){return new Vd(b,this.g,this.shift,this.root,this.Y,this.l)};
g.K=function(a,b){if(32>this.g-Nd(this)){for(var c=this.Y.length,d=Array(c+1),e=0;;)if(e<c)d[e]=this.Y[e],e+=1;else break;d[c]=b;return new Vd(this.o,this.g+1,this.shift,this.root,d,null)}c=(d=this.g>>>5>1<<this.shift)?this.shift+5:this.shift;d?(d=Md(null),d.a[0]=this.root,e=Od(null,this.shift,new Ld(null,this.Y)),d.a[1]=e):d=Pd(this,this.shift,this.root,new Ld(null,this.Y));return new Vd(this.o,this.g+1,c,d,[b],null)};
g.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.M(null,c);case 3:return this.ba(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.c=function(a,c){return this.M(null,c)};a.i=function(a,c,d){return this.ba(null,c,d)};return a}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};g.f=function(a){return this.M(null,a)};g.c=function(a,b){return this.ba(null,a,b)};
var ae=new Ld(null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]),Jc=new Vd(null,0,5,ae,[],tc);Vd.prototype[jb]=function(){return R(this)};function be(a,b,c,d,e,f){this.da=a;this.node=b;this.j=c;this.J=d;this.o=e;this.l=f;this.h=32375020;this.u=1536}g=be.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.o};
g.Z=function(){if(this.J+1<this.node.length){var a;a=this.da;var b=this.node,c=this.j,d=this.J+1;a=Zd?Zd(a,b,c,d):$d.call(null,a,b,c,d);return null==a?null:a}return Yb(this)};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){var c;c=this.da;var d=this.j+this.J,e=U(this.da);c=ce?ce(c,d,e):de.call(null,c,d,e);return xc(c,b)};
g.U=function(a,b,c){a=this.da;var d=this.j+this.J,e=U(this.da);a=ce?ce(a,d,e):de.call(null,a,d,e);return yc(a,b,c)};g.V=function(){return this.node[this.J]};g.$=function(){if(this.J+1<this.node.length){var a;a=this.da;var b=this.node,c=this.j,d=this.J+1;a=Zd?Zd(a,b,c,d):$d.call(null,a,b,c,d);return null==a?pc:a}return Xb(this)};g.P=function(){return this};g.hb=function(){var a=this.node;return new rd(a,this.J,a.length)};
g.ib=function(){var a=this.j+this.node.length;if(a<mb(this.da)){var b=this.da,c=Rd(this.da,a);return Zd?Zd(b,c,a,0):$d.call(null,b,c,a,0)}return pc};g.R=function(a,b){var c=this.da,d=this.node,e=this.j,f=this.J;return ee?ee(c,d,e,f,b):$d.call(null,c,d,e,f,b)};g.K=function(a,b){return T(b,this)};g.gb=function(){var a=this.j+this.node.length;if(a<mb(this.da)){var b=this.da,c=Rd(this.da,a);return Zd?Zd(b,c,a,0):$d.call(null,b,c,a,0)}return null};be.prototype[jb]=function(){return R(this)};
function $d(){switch(arguments.length){case 3:var a=arguments[0],b=arguments[1],c=arguments[2];return new be(a,Sd(a,b),b,c,null,null);case 4:return Zd(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return ee(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}}function Zd(a,b,c,d){return new be(a,b,c,d,null,null)}function ee(a,b,c,d,e){return new be(a,b,c,d,e,null)}
function fe(a,b,c,d,e){this.o=a;this.Ba=b;this.start=c;this.end=d;this.l=e;this.h=167666463;this.u=8192}g=fe.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.N=function(a,b){return I.i(this,b,null)};g.F=function(a,b,c){return"number"===typeof b?E.i(this,b,c):c};g.M=function(a,b){return 0>b||this.end<=this.start+b?Qd(b,this.end-this.start):E.c(this.Ba,this.start+b)};g.ba=function(a,b,c){return 0>b||this.end<=this.start+b?c:E.i(this.Ba,this.start+b,c)};
g.lb=function(a,b,c){var d=this.start+b;a=this.o;c=Oc.i(this.Ba,d,c);b=this.start;var e=this.end,d=d+1,d=e>d?e:d;return ge.L?ge.L(a,c,b,d,null):ge.call(null,a,c,b,d,null)};g.H=function(){return this.o};g.X=function(){return this.end-this.start};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return xc(this,b)};g.U=function(a,b,c){return yc(this,b,c)};
g.Na=function(a,b,c){if("number"===typeof b)return zb(this,b,c);throw Error("Subvec's key for assoc must be a number.");};g.P=function(){var a=this;return function(b){return function d(e){return e===a.end?null:T(E.c(a.Ba,e),new od(null,function(){return function(){return d(e+1)}}(b),null,null))}}(this)(a.start)};g.R=function(a,b){var c=this.Ba,d=this.start,e=this.end,f=this.l;return ge.L?ge.L(b,c,d,e,f):ge.call(null,b,c,d,e,f)};
g.K=function(a,b){var c=this.o,d=zb(this.Ba,this.end,b),e=this.start,f=this.end+1;return ge.L?ge.L(c,d,e,f,null):ge.call(null,c,d,e,f,null)};g.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.M(null,c);case 3:return this.ba(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.c=function(a,c){return this.M(null,c)};a.i=function(a,c,d){return this.ba(null,c,d)};return a}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};
g.f=function(a){return this.M(null,a)};g.c=function(a,b){return this.ba(null,a,b)};fe.prototype[jb]=function(){return R(this)};function ge(a,b,c,d,e){for(;;)if(b instanceof fe)c=b.start+c,d=b.start+d,b=b.Ba;else{var f=U(b);if(0>c||0>d||c>f||d>f)throw Error("Index out of bounds");return new fe(a,b,c,d,e)}}
function de(){switch(arguments.length){case 2:var a=arguments[0];return ce(a,arguments[1],U(a));case 3:return ce(arguments[0],arguments[1],arguments[2]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}}function ce(a,b,c){return ge(null,a,b,c,null)}function he(a,b){return a===b.v?b:new Ld(a,D(b.a))}function Xd(a){return new Ld({},D(a.a))}
function Yd(a){var b=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];Yc(a,0,b,0,a.length);return b}var ie=function ie(b,c,d,e){d=he(b.root.v,d);var f=b.g-1>>>c&31;if(5===c)b=e;else{var h=d.a[f];b=null!=h?ie(b,c-5,h,e):Od(b.root.v,c-5,e)}d.a[f]=b;return d};function Wd(a,b,c,d){this.g=a;this.shift=b;this.root=c;this.Y=d;this.u=88;this.h=275}g=Wd.prototype;
g.Za=function(a,b){if(this.root.v){if(32>this.g-Nd(this))this.Y[this.g&31]=b;else{var c=new Ld(this.root.v,this.Y),d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];d[0]=b;this.Y=d;if(this.g>>>5>1<<this.shift){var d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],e=this.shift+
5;d[0]=this.root;d[1]=Od(this.root.v,this.shift,c);this.root=new Ld(this.root.v,d);this.shift=e}else this.root=ie(this,this.shift,this.root,c)}this.g+=1;return this}throw Error("conj! after persistent!");};g.$a=function(){if(this.root.v){this.root.v=null;var a=this.g-Nd(this),b=Array(a);Yc(this.Y,0,b,0,a);return new Vd(null,this.g,this.shift,this.root,b,null)}throw Error("persistent! called twice");};
g.Oa=function(a,b,c){if("number"===typeof b)return Ub(this,b,c);throw Error("TransientVector's key for assoc! must be a number.");};
g.qb=function(a,b,c){var d=this;if(d.root.v){if(0<=b&&b<d.g)return Nd(this)<=b?d.Y[b&31]=c:(a=function(){return function f(a,k){var l=he(d.root.v,k);if(0===a)l.a[b&31]=c;else{var m=b>>>a&31,n=f(a-5,l.a[m]);l.a[m]=n}return l}}(this).call(null,d.shift,d.root),d.root=a),this;if(b===d.g)return Rb(this,c);throw Error([C("Index "),C(b),C(" out of bounds for TransientVector of length"),C(d.g)].join(""));}throw Error("assoc! after persistent!");};
g.X=function(){if(this.root.v)return this.g;throw Error("count after persistent!");};g.M=function(a,b){if(this.root.v)return Sd(this,b)[b&31];throw Error("nth after persistent!");};g.ba=function(a,b,c){return 0<=b&&b<this.g?E.c(this,b):c};g.N=function(a,b){return I.i(this,b,null)};g.F=function(a,b,c){return"number"===typeof b?E.i(this,b,c):c};
g.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.N(null,c);case 3:return this.F(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.c=function(a,c){return this.N(null,c)};a.i=function(a,c,d){return this.F(null,c,d)};return a}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};g.f=function(a){return this.N(null,a)};g.c=function(a,b){return this.F(null,a,b)};function je(){this.h=2097152;this.u=0}
je.prototype.equiv=function(a){return this.m(null,a)};je.prototype.m=function(){return!1};var ke=new je;function le(a,b){return $c(Uc(b)?U(a)===U(b)?Cd(ed,X.c(function(a){return Q.c(Nc(b,O(a),ke),O(P(a)))},a)):null:null)}function me(a){this.s=a}me.prototype.next=function(){if(null!=this.s){var a=O(this.s),b=Lc(a,0),a=Lc(a,1);this.s=P(this.s);return{value:[b,a],done:!1}}return{value:null,done:!0}};function ne(a){return new me(M(a))}
function oe(a,b){var c;if(b instanceof W)a:{c=a.length;for(var d=b.Da,e=0;;){if(c<=e){c=-1;break a}var f=a[e];if(f instanceof W&&d===f.Da){c=e;break a}e+=2}}else if(c=da(b),w(w(c)?c:"number"===typeof b))a:for(c=a.length,d=0;;){if(c<=d){c=-1;break a}if(b===a[d]){c=d;break a}d+=2}else if(b instanceof nc)a:for(c=a.length,d=b.Fa,e=0;;){if(c<=e){c=-1;break a}f=a[e];if(f instanceof nc&&d===f.Fa){c=e;break a}e+=2}else if(null==b)a:for(c=a.length,d=0;;){if(c<=d){c=-1;break a}if(null==a[d]){c=d;break a}d+=
2}else a:for(c=a.length,d=0;;){if(c<=d){c=-1;break a}if(Q.c(b,a[d])){c=d;break a}d+=2}return c}function pe(a,b,c){this.a=a;this.j=b;this.aa=c;this.h=32374990;this.u=0}g=pe.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.aa};g.Z=function(){return this.j<this.a.length-2?new pe(this.a,this.j+2,this.aa):null};g.X=function(){return(this.a.length-this.j)/2};g.D=function(){return sc(this)};g.m=function(a,b){return Ec(this,b)};
g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){return new Vd(null,2,5,ae,[this.a[this.j],this.a[this.j+1]],null)};g.$=function(){return this.j<this.a.length-2?new pe(this.a,this.j+2,this.aa):pc};g.P=function(){return this};g.R=function(a,b){return new pe(this.a,this.j,b)};g.K=function(a,b){return T(b,this)};pe.prototype[jb]=function(){return R(this)};function qe(a,b,c){this.a=a;this.j=b;this.g=c}qe.prototype.nb=function(){return this.j<this.g};
qe.prototype.next=function(){var a=new Vd(null,2,5,ae,[this.a[this.j],this.a[this.j+1]],null);this.j+=2;return a};function ab(a,b,c,d){this.o=a;this.g=b;this.a=c;this.l=d;this.h=16647951;this.u=8196}g=ab.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.keys=function(){return R(re.f?re.f(this):re.call(null,this))};g.entries=function(){return ne(M(this))};g.values=function(){return R(se.f?se.f(this):se.call(null,this))};
g.has=function(a){return Nc(this,a,Zc)===Zc?!1:!0};g.get=function(a,b){return this.F(null,a,b)};g.forEach=function(a){for(var b=M(this),c=null,d=0,e=0;;)if(e<d){var f=c.M(null,e),h=Lc(f,0),f=Lc(f,1);a.c?a.c(f,h):a.call(null,f,h);e+=1}else if(b=M(b))Wc(b)?(c=Wb(b),b=Xb(b),h=c,d=U(c),c=h):(c=O(b),h=Lc(c,0),c=f=Lc(c,1),a.c?a.c(c,h):a.call(null,c,h),b=P(b),c=null,d=0),e=0;else return null};g.N=function(a,b){return I.i(this,b,null)};g.F=function(a,b,c){a=oe(this.a,b);return-1===a?c:this.a[a+1]};
g.Wa=function(){return new qe(this.a,0,2*this.g)};g.H=function(){return this.o};g.X=function(){return this.g};g.D=function(){var a=this.l;return null!=a?a:this.l=a=uc(this)};g.m=function(a,b){if(b&&(b.h&1024||b.Bb)){var c=this.a.length;if(this.g===b.X(null))for(var d=0;;)if(d<c){var e=b.F(null,this.a[d],Zc);if(e!==Zc)if(Q.c(this.a[d+1],e))d+=2;else return!1;else return!1}else return!0;else return!1}else return le(this,b)};g.Ua=function(){return new ue({},this.a.length,D(this.a))};
g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};
g.Na=function(a,b,c){a=oe(this.a,b);if(-1===a){if(this.g<ve){a=this.a;for(var d=a.length,e=Array(d+2),f=0;;)if(f<d)e[f]=a[f],f+=1;else break;e[d]=b;e[d+1]=c;return new ab(this.o,this.g+1,e,null)}a=Pc;null!=a?a&&(a.u&4||a.Qb)?(d=bd(Rb,Qb(a),this),d=Sb(d),a=Tc(a),a=Qc(d)&&!(d?d.h&262144||d.Vb||(d.h?0:x(Db,d)):x(Db,d))?new Rc(d,a):null==d?null:Eb(d,a)):a=bd(ob,a,this):a=bd(Ic,pc,this);return Eb(tb(a,b,c),this.o)}if(c===this.a[a+1])return this;b=D(this.a);b[a+1]=c;return new ab(this.o,this.g,b,null)};
g.P=function(){var a=this.a;return 0<=a.length-2?new pe(a,0,null):null};g.R=function(a,b){return new ab(b,this.g,this.a,this.l)};g.K=function(a,b){if(Vc(b))return tb(this,E.c(b,0),E.c(b,1));for(var c=this,d=M(b);;){if(null==d)return c;var e=O(d);if(Vc(e))c=tb(c,E.c(e,0),E.c(e,1)),d=P(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
g.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.N(null,c);case 3:return this.F(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.c=function(a,c){return this.N(null,c)};a.i=function(a,c,d){return this.F(null,c,d)};return a}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};g.f=function(a){return this.N(null,a)};g.c=function(a,b){return this.F(null,a,b)};var ve=8;ab.prototype[jb]=function(){return R(this)};
function ue(a,b,c){this.Ka=a;this.Ma=b;this.a=c;this.h=258;this.u=56}g=ue.prototype;g.X=function(){if(w(this.Ka))return fd(this.Ma);throw Error("count after persistent!");};g.N=function(a,b){return I.i(this,b,null)};g.F=function(a,b,c){if(w(this.Ka))return a=oe(this.a,b),-1===a?c:this.a[a+1];throw Error("lookup after persistent!");};
g.Za=function(a,b){if(w(this.Ka)){if(b?b.h&2048||b.Cb||(b.h?0:x(vb,b)):x(vb,b))return Tb(this,we.f?we.f(b):we.call(null,b),xe.f?xe.f(b):xe.call(null,b));for(var c=M(b),d=this;;){var e=O(c);if(w(e))var f=e,c=P(c),d=Tb(d,function(){var a=f;return we.f?we.f(a):we.call(null,a)}(),function(){var a=f;return xe.f?xe.f(a):xe.call(null,a)}());else return d}}else throw Error("conj! after persistent!");};
g.$a=function(){if(w(this.Ka))return this.Ka=!1,new ab(null,fd(this.Ma),this.a,null);throw Error("persistent! called twice");};g.Oa=function(a,b,c){if(w(this.Ka)){a=oe(this.a,b);if(-1===a){if(this.Ma+2<=2*ve)return this.Ma+=2,this.a.push(b),this.a.push(c),this;a=this.Ma;var d=this.a;a=ye.c?ye.c(a,d):ye.call(null,a,d);return Tb(a,b,c)}c!==this.a[a+1]&&(this.a[a+1]=c);return this}throw Error("assoc! after persistent!");};
function ye(a,b){for(var c=Qb(Pc),d=0;;)if(d<a)c=Tb(c,b[d],b[d+1]),d+=2;else return c}function ze(){this.ja=!1}function Ae(a,b){return a===b?!0:a===b||a instanceof W&&b instanceof W&&a.Da===b.Da?!0:Q.c(a,b)}function Be(a,b,c){a=D(a);a[b]=c;return a}function Ce(a,b,c,d){a=a.Ha(b);a.a[c]=d;return a}function De(a,b,c){this.v=a;this.G=b;this.a=c}g=De.prototype;g.Ha=function(a){if(a===this.v)return this;var b=hd(this.G),c=Array(0>b?4:2*(b+1));Yc(this.a,0,c,0,2*b);return new De(a,this.G,c)};
g.Qa=function(){var a=this.a;return Ee?Ee(a):Fe.call(null,a)};g.Ia=function(a,b,c,d){var e=1<<(b>>>a&31);if(0===(this.G&e))return d;var f=hd(this.G&e-1),e=this.a[2*f],f=this.a[2*f+1];return null==e?f.Ia(a+5,b,c,d):Ae(c,e)?f:d};
g.ga=function(a,b,c,d,e,f){var h=1<<(c>>>b&31),k=hd(this.G&h-1);if(0===(this.G&h)){var l=hd(this.G);if(2*l<this.a.length){a=this.Ha(a);b=a.a;f.ja=!0;a:for(c=2*(l-k),f=2*k+(c-1),l=2*(k+1)+(c-1);;){if(0===c)break a;b[l]=b[f];--l;--c;--f}b[2*k]=d;b[2*k+1]=e;a.G|=h;return a}if(16<=l){k=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];k[c>>>b&31]=Ge.ga(a,b+5,c,d,e,f);for(e=d=0;;)if(32>d)0!==
(this.G>>>d&1)&&(k[d]=null!=this.a[e]?Ge.ga(a,b+5,lc(this.a[e]),this.a[e],this.a[e+1],f):this.a[e+1],e+=2),d+=1;else break;return new He(a,l+1,k)}b=Array(2*(l+4));Yc(this.a,0,b,0,2*k);b[2*k]=d;b[2*k+1]=e;Yc(this.a,2*k,b,2*(k+1),2*(l-k));f.ja=!0;a=this.Ha(a);a.a=b;a.G|=h;return a}l=this.a[2*k];h=this.a[2*k+1];if(null==l)return l=h.ga(a,b+5,c,d,e,f),l===h?this:Ce(this,a,2*k+1,l);if(Ae(d,l))return e===h?this:Ce(this,a,2*k+1,e);f.ja=!0;f=b+5;d=Ie?Ie(a,f,l,h,c,d,e):Je.call(null,a,f,l,h,c,d,e);e=2*k;k=
2*k+1;a=this.Ha(a);a.a[e]=null;a.a[k]=d;return a};
g.fa=function(a,b,c,d,e){var f=1<<(b>>>a&31),h=hd(this.G&f-1);if(0===(this.G&f)){var k=hd(this.G);if(16<=k){h=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];h[b>>>a&31]=Ge.fa(a+5,b,c,d,e);for(d=c=0;;)if(32>c)0!==(this.G>>>c&1)&&(h[c]=null!=this.a[d]?Ge.fa(a+5,lc(this.a[d]),this.a[d],this.a[d+1],e):this.a[d+1],d+=2),c+=1;else break;return new He(null,k+1,h)}a=Array(2*(k+1));Yc(this.a,
0,a,0,2*h);a[2*h]=c;a[2*h+1]=d;Yc(this.a,2*h,a,2*(h+1),2*(k-h));e.ja=!0;return new De(null,this.G|f,a)}var l=this.a[2*h],f=this.a[2*h+1];if(null==l)return k=f.fa(a+5,b,c,d,e),k===f?this:new De(null,this.G,Be(this.a,2*h+1,k));if(Ae(c,l))return d===f?this:new De(null,this.G,Be(this.a,2*h+1,d));e.ja=!0;e=this.G;k=this.a;a+=5;a=Ke?Ke(a,l,f,b,c,d):Je.call(null,a,l,f,b,c,d);c=2*h;h=2*h+1;d=D(k);d[c]=null;d[h]=a;return new De(null,e,d)};var Ge=new De(null,0,[]);
function He(a,b,c){this.v=a;this.g=b;this.a=c}g=He.prototype;g.Ha=function(a){return a===this.v?this:new He(a,this.g,D(this.a))};g.Qa=function(){var a=this.a;return Le?Le(a):Me.call(null,a)};g.Ia=function(a,b,c,d){var e=this.a[b>>>a&31];return null!=e?e.Ia(a+5,b,c,d):d};g.ga=function(a,b,c,d,e,f){var h=c>>>b&31,k=this.a[h];if(null==k)return a=Ce(this,a,h,Ge.ga(a,b+5,c,d,e,f)),a.g+=1,a;b=k.ga(a,b+5,c,d,e,f);return b===k?this:Ce(this,a,h,b)};
g.fa=function(a,b,c,d,e){var f=b>>>a&31,h=this.a[f];if(null==h)return new He(null,this.g+1,Be(this.a,f,Ge.fa(a+5,b,c,d,e)));a=h.fa(a+5,b,c,d,e);return a===h?this:new He(null,this.g,Be(this.a,f,a))};function Ne(a,b,c){b*=2;for(var d=0;;)if(d<b){if(Ae(c,a[d]))return d;d+=2}else return-1}function Oe(a,b,c,d){this.v=a;this.Ca=b;this.g=c;this.a=d}g=Oe.prototype;g.Ha=function(a){if(a===this.v)return this;var b=Array(2*(this.g+1));Yc(this.a,0,b,0,2*this.g);return new Oe(a,this.Ca,this.g,b)};
g.Qa=function(){var a=this.a;return Ee?Ee(a):Fe.call(null,a)};g.Ia=function(a,b,c,d){a=Ne(this.a,this.g,c);return 0>a?d:Ae(c,this.a[a])?this.a[a+1]:d};
g.ga=function(a,b,c,d,e,f){if(c===this.Ca){b=Ne(this.a,this.g,d);if(-1===b){if(this.a.length>2*this.g)return b=2*this.g,c=2*this.g+1,a=this.Ha(a),a.a[b]=d,a.a[c]=e,f.ja=!0,a.g+=1,a;c=this.a.length;b=Array(c+2);Yc(this.a,0,b,0,c);b[c]=d;b[c+1]=e;f.ja=!0;d=this.g+1;a===this.v?(this.a=b,this.g=d,a=this):a=new Oe(this.v,this.Ca,d,b);return a}return this.a[b+1]===e?this:Ce(this,a,b+1,e)}return(new De(a,1<<(this.Ca>>>b&31),[null,this,null,null])).ga(a,b,c,d,e,f)};
g.fa=function(a,b,c,d,e){return b===this.Ca?(a=Ne(this.a,this.g,c),-1===a?(a=2*this.g,b=Array(a+2),Yc(this.a,0,b,0,a),b[a]=c,b[a+1]=d,e.ja=!0,new Oe(null,this.Ca,this.g+1,b)):Q.c(this.a[a],d)?this:new Oe(null,this.Ca,this.g,Be(this.a,a+1,d))):(new De(null,1<<(this.Ca>>>a&31),[null,this])).fa(a,b,c,d,e)};
function Je(){switch(arguments.length){case 6:return Ke(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);case 7:return Ie(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}}function Ke(a,b,c,d,e,f){var h=lc(b);if(h===d)return new Oe(null,h,2,[b,c,e,f]);var k=new ze;return Ge.fa(a,h,b,c,k).fa(a,d,e,f,k)}
function Ie(a,b,c,d,e,f,h){var k=lc(c);if(k===e)return new Oe(null,k,2,[c,d,f,h]);var l=new ze;return Ge.ga(a,b,k,c,d,l).ga(a,b,e,f,h,l)}function Pe(a,b,c,d,e){this.o=a;this.Ea=b;this.j=c;this.s=d;this.l=e;this.h=32374860;this.u=0}g=Pe.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.o};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};
g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){return null==this.s?new Vd(null,2,5,ae,[this.Ea[this.j],this.Ea[this.j+1]],null):O(this.s)};g.$=function(){if(null==this.s){var a=this.Ea,b=this.j+2;return Qe?Qe(a,b,null):Fe.call(null,a,b,null)}var a=this.Ea,b=this.j,c=P(this.s);return Qe?Qe(a,b,c):Fe.call(null,a,b,c)};g.P=function(){return this};g.R=function(a,b){return new Pe(b,this.Ea,this.j,this.s,this.l)};g.K=function(a,b){return T(b,this)};Pe.prototype[jb]=function(){return R(this)};
function Fe(){switch(arguments.length){case 1:return Ee(arguments[0]);case 3:return Qe(arguments[0],arguments[1],arguments[2]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}}function Ee(a){return Qe(a,0,null)}function Qe(a,b,c){if(null==c)for(c=a.length;;)if(b<c){if(null!=a[b])return new Pe(null,a,b,null,null);var d=a[b+1];if(w(d)&&(d=d.Qa(),w(d)))return new Pe(null,a,b+2,d,null);b+=2}else return null;else return new Pe(null,a,b,c,null)}
function Re(a,b,c,d,e){this.o=a;this.Ea=b;this.j=c;this.s=d;this.l=e;this.h=32374860;this.u=0}g=Re.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.o};g.D=function(){var a=this.l;return null!=a?a:this.l=a=sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){return O(this.s)};
g.$=function(){var a=this.Ea,b=this.j,c=P(this.s);return Se?Se(null,a,b,c):Me.call(null,null,a,b,c)};g.P=function(){return this};g.R=function(a,b){return new Re(b,this.Ea,this.j,this.s,this.l)};g.K=function(a,b){return T(b,this)};Re.prototype[jb]=function(){return R(this)};function Me(){switch(arguments.length){case 1:return Le(arguments[0]);case 4:return Se(arguments[0],arguments[1],arguments[2],arguments[3]);default:throw Error([C("Invalid arity: "),C(arguments.length)].join(""));}}
function Le(a){return Se(null,a,0,null)}function Se(a,b,c,d){if(null==d)for(d=b.length;;)if(c<d){var e=b[c];if(w(e)&&(e=e.Qa(),w(e)))return new Re(a,b,c+1,e,null);c+=1}else return null;else return new Re(a,b,c,d,null)}function Te(a,b,c,d,e,f){this.o=a;this.g=b;this.root=c;this.ca=d;this.ea=e;this.l=f;this.h=16123663;this.u=8196}g=Te.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.keys=function(){return R(re.f?re.f(this):re.call(null,this))};
g.entries=function(){return ne(M(this))};g.values=function(){return R(se.f?se.f(this):se.call(null,this))};g.has=function(a){return Nc(this,a,Zc)===Zc?!1:!0};g.get=function(a,b){return this.F(null,a,b)};g.forEach=function(a){for(var b=M(this),c=null,d=0,e=0;;)if(e<d){var f=c.M(null,e),h=Lc(f,0),f=Lc(f,1);a.c?a.c(f,h):a.call(null,f,h);e+=1}else if(b=M(b))Wc(b)?(c=Wb(b),b=Xb(b),h=c,d=U(c),c=h):(c=O(b),h=Lc(c,0),c=f=Lc(c,1),a.c?a.c(c,h):a.call(null,c,h),b=P(b),c=null,d=0),e=0;else return null};
g.N=function(a,b){return I.i(this,b,null)};g.F=function(a,b,c){return null==b?this.ca?this.ea:c:null==this.root?c:this.root.Ia(0,lc(b),b,c)};g.H=function(){return this.o};g.X=function(){return this.g};g.D=function(){var a=this.l;return null!=a?a:this.l=a=uc(this)};g.m=function(a,b){return le(this,b)};g.Ua=function(){return new Ue({},this.root,this.g,this.ca,this.ea)};
g.Na=function(a,b,c){if(null==b)return this.ca&&c===this.ea?this:new Te(this.o,this.ca?this.g:this.g+1,this.root,!0,c,null);a=new ze;b=(null==this.root?Ge:this.root).fa(0,lc(b),b,c,a);return b===this.root?this:new Te(this.o,a.ja?this.g+1:this.g,b,this.ca,this.ea,null)};g.P=function(){if(0<this.g){var a=null!=this.root?this.root.Qa():null;return this.ca?T(new Vd(null,2,5,ae,[null,this.ea],null),a):a}return null};g.R=function(a,b){return new Te(b,this.g,this.root,this.ca,this.ea,this.l)};
g.K=function(a,b){if(Vc(b))return tb(this,E.c(b,0),E.c(b,1));for(var c=this,d=M(b);;){if(null==d)return c;var e=O(d);if(Vc(e))c=tb(c,E.c(e,0),E.c(e,1)),d=P(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
g.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.N(null,c);case 3:return this.F(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.c=function(a,c){return this.N(null,c)};a.i=function(a,c,d){return this.F(null,c,d)};return a}();g.apply=function(a,b){return this.call.apply(this,[this].concat(D(b)))};g.f=function(a){return this.N(null,a)};g.c=function(a,b){return this.F(null,a,b)};var Pc=new Te(null,0,null,!1,null,vc);Te.prototype[jb]=function(){return R(this)};
function Ue(a,b,c,d,e){this.v=a;this.root=b;this.count=c;this.ca=d;this.ea=e;this.h=258;this.u=56}function Ve(a,b){if(a.v){if(b?b.h&2048||b.Cb||(b.h?0:x(vb,b)):x(vb,b))return We(a,we.f?we.f(b):we.call(null,b),xe.f?xe.f(b):xe.call(null,b));for(var c=M(b),d=a;;){var e=O(c);if(w(e))var f=e,c=P(c),d=We(d,function(){var a=f;return we.f?we.f(a):we.call(null,a)}(),function(){var a=f;return xe.f?xe.f(a):xe.call(null,a)}());else return d}}else throw Error("conj! after persistent");}
function We(a,b,c){if(a.v){if(null==b)a.ea!==c&&(a.ea=c),a.ca||(a.count+=1,a.ca=!0);else{var d=new ze;b=(null==a.root?Ge:a.root).ga(a.v,0,lc(b),b,c,d);b!==a.root&&(a.root=b);d.ja&&(a.count+=1)}return a}throw Error("assoc! after persistent!");}g=Ue.prototype;g.X=function(){if(this.v)return this.count;throw Error("count after persistent!");};g.N=function(a,b){return null==b?this.ca?this.ea:null:null==this.root?null:this.root.Ia(0,lc(b),b)};
g.F=function(a,b,c){return null==b?this.ca?this.ea:c:null==this.root?c:this.root.Ia(0,lc(b),b,c)};g.Za=function(a,b){return Ve(this,b)};g.$a=function(){var a;if(this.v)this.v=null,a=new Te(null,this.count,this.root,this.ca,this.ea,null);else throw Error("persistent! called twice");return a};g.Oa=function(a,b,c){return We(this,b,c)};var Gd=function Gd(){return Gd.w(0<arguments.length?new N(Array.prototype.slice.call(arguments,0),0):null)};
Gd.w=function(a){for(var b=M(a),c=Qb(Pc);;)if(b){a=P(P(b));var d=O(b),b=O(P(b)),c=Tb(c,d,b),b=a}else return Sb(c)};Gd.S=0;Gd.I=function(a){return Gd.w(M(a))};function Xe(a,b){this.W=a;this.aa=b;this.h=32374988;this.u=0}g=Xe.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.aa};g.Z=function(){var a=this.W,a=(a?a.h&128||a.Xa||(a.h?0:x(rb,a)):x(rb,a))?this.W.Z(null):P(this.W);return null==a?null:new Xe(a,this.aa)};g.D=function(){return sc(this)};
g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};g.V=function(){return this.W.V(null).jb()};g.$=function(){var a=this.W,a=(a?a.h&128||a.Xa||(a.h?0:x(rb,a)):x(rb,a))?this.W.Z(null):P(this.W);return null!=a?new Xe(a,this.aa):pc};g.P=function(){return this};g.R=function(a,b){return new Xe(this.W,b)};g.K=function(a,b){return T(b,this)};Xe.prototype[jb]=function(){return R(this)};function re(a){return(a=M(a))?new Xe(a,null):null}
function we(a){return wb(a)}function Ye(a,b){this.W=a;this.aa=b;this.h=32374988;this.u=0}g=Ye.prototype;g.toString=function(){return bc(this)};g.equiv=function(a){return this.m(null,a)};g.H=function(){return this.aa};g.Z=function(){var a=this.W,a=(a?a.h&128||a.Xa||(a.h?0:x(rb,a)):x(rb,a))?this.W.Z(null):P(this.W);return null==a?null:new Ye(a,this.aa)};g.D=function(){return sc(this)};g.m=function(a,b){return Ec(this,b)};g.T=function(a,b){return ad(b,this)};g.U=function(a,b,c){return dd(b,c,this)};
g.V=function(){return this.W.V(null).kb()};g.$=function(){var a=this.W,a=(a?a.h&128||a.Xa||(a.h?0:x(rb,a)):x(rb,a))?this.W.Z(null):P(this.W);return null!=a?new Ye(a,this.aa):pc};g.P=function(){return this};g.R=function(a,b){return new Ye(this.W,b)};g.K=function(a,b){return T(b,this)};Ye.prototype[jb]=function(){return R(this)};function se(a){return(a=M(a))?new Ye(a,null):null}function xe(a){return xb(a)}
function nd(a){if(a&&(a.u&4096||a.Eb))return a.name;if("string"===typeof a)return a;throw Error([C("Doesn't support name: "),C(a)].join(""));}
function Ze(a,b,c,d,e,f,h){var k=Ya;Ya=null==Ya?null:Ya-1;try{if(null!=Ya&&0>Ya)return J(a,"#");J(a,c);if(0===gb.f(f))M(h)&&J(a,function(){var a=$e.f(f);return w(a)?a:"..."}());else{if(M(h)){var l=O(h);b.i?b.i(l,a,f):b.call(null,l,a,f)}for(var m=P(h),n=gb.f(f)-1;;)if(!m||null!=n&&0===n){M(m)&&0===n&&(J(a,d),J(a,function(){var a=$e.f(f);return w(a)?a:"..."}()));break}else{J(a,d);var p=O(m);c=a;h=f;b.i?b.i(p,c,h):b.call(null,p,c,h);var q=P(m);c=n-1;m=q;n=c}}return J(a,e)}finally{Ya=k}}
function af(a,b){for(var c=M(b),d=null,e=0,f=0;;)if(f<e){var h=d.M(null,f);J(a,h);f+=1}else if(c=M(c))d=c,Wc(d)?(c=Wb(d),e=Xb(d),d=c,h=U(c),c=e,e=h):(h=O(d),J(a,h),c=P(d),d=null,e=0),f=0;else return null}var bf={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};function cf(a){return[C('"'),C(a.replace(RegExp('[\\\\"\b\f\n\r\t]',"g"),function(a){return bf[a]})),C('"')].join("")}
function df(a,b,c){if(null==a)return J(b,"nil");if(void 0===a)return J(b,"#\x3cundefined\x3e");if(w(function(){var b=Mc(c,eb);return w(b)?(b=a?a.h&131072||a.Db?!0:a.h?!1:x(Bb,a):x(Bb,a))?Tc(a):b:b}())){J(b,"^");var d=Tc(a);Z.i?Z.i(d,b,c):Z.call(null,d,b,c);J(b," ")}return null==a?J(b,"nil"):a.Mb?a.Wb(a,b,c):a&&(a.h&2147483648||a.O)?a.B(null,b,c):(null==a?null:a.constructor)===Boolean||"number"===typeof a?J(b,""+C(a)):null!=a&&a.constructor===Object?(J(b,"#js "),d=X.c(function(b){return new Vd(null,
2,5,ae,[md.f(b),a[b]],null)},Xc(a)),ef.A?ef.A(d,Z,b,c):ef.call(null,d,Z,b,c)):hb(a)?Ze(b,Z,"#js ["," ","]",c,a):w(da(a))?w(cb.f(c))?J(b,cf(a)):J(b,a):Qc(a)?af(b,Hc(["#\x3c",""+C(a),"\x3e"],0)):a instanceof Date?(d=function(a,b){for(var c=""+C(a);;)if(U(c)<b)c=[C("0"),C(c)].join("");else return c},af(b,Hc(['#inst "',""+C(a.getUTCFullYear()),"-",d(a.getUTCMonth()+1,2),"-",d(a.getUTCDate(),2),"T",d(a.getUTCHours(),2),":",d(a.getUTCMinutes(),2),":",d(a.getUTCSeconds(),2),".",d(a.getUTCMilliseconds(),
3),"-",'00:00"'],0))):w(a instanceof RegExp)?af(b,Hc(['#"',a.source,'"'],0)):(a?a.h&2147483648||a.O||(a.h?0:x(Nb,a)):x(Nb,a))?Ob(a,b,c):af(b,Hc(["#\x3c",""+C(a),"\x3e"],0))}function Z(a,b,c){var d=ff.f(c);return w(d)?(c=Oc.i(c,gf,df),d.i?d.i(a,b,c):d.call(null,a,b,c)):df(a,b,c)}
function Jd(){var a=0<arguments.length?new N(Array.prototype.slice.call(arguments,0),0):null,b=$a(),c;(c=null==a)||(c=M(a),c=w(c)?!1:!0);if(c)c="";else{c=C;var d=b,b=new Wa;a:{var e=a,a=new ac(b);Z(O(e),a,d);for(var e=M(P(e)),f=null,h=0,k=0;;)if(k<h){var l=f.M(null,k);J(a," ");Z(l,a,d);k+=1}else if(e=M(e))f=e,Wc(f)?(e=Wb(f),h=Xb(f),f=e,l=U(e),e=h,h=l):(l=O(f),J(a," "),Z(l,a,d),e=P(f),f=null,h=0),k=0;else break a}c=""+c(b)}return c}
function ef(a,b,c,d){return Ze(c,function(a,c,d){var k=wb(a);b.i?b.i(k,c,d):b.call(null,k,c,d);J(c," ");a=xb(a);return b.i?b.i(a,c,d):b.call(null,a,c,d)},"{",", ","}",d,M(a))}N.prototype.O=!0;N.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};od.prototype.O=!0;od.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};Pe.prototype.O=!0;Pe.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};pe.prototype.O=!0;
pe.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};be.prototype.O=!0;be.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};ld.prototype.O=!0;ld.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};Te.prototype.O=!0;Te.prototype.B=function(a,b,c){return ef(this,Z,b,c)};Re.prototype.O=!0;Re.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};fe.prototype.O=!0;fe.prototype.B=function(a,b,c){return Ze(b,Z,"["," ","]",c,this)};sd.prototype.O=!0;
sd.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};Dd.prototype.O=!0;Dd.prototype.B=function(a,b,c){J(b,"#\x3cAtom: ");Z(this.state,b,c);return J(b,"\x3e")};Ye.prototype.O=!0;Ye.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};Vd.prototype.O=!0;Vd.prototype.B=function(a,b,c){return Ze(b,Z,"["," ","]",c,this)};jd.prototype.O=!0;jd.prototype.B=function(a,b){return J(b,"()")};ab.prototype.O=!0;ab.prototype.B=function(a,b,c){return ef(this,Z,b,c)};Xe.prototype.O=!0;
Xe.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};id.prototype.O=!0;id.prototype.B=function(a,b,c){return Ze(b,Z,"("," ",")",c,this)};var eb=new W(null,"meta","meta",1499536964),fb=new W(null,"dup","dup",556298533),hf=new W(null,"running?","running?",-257884763),Hd=new W(null,"validator","validator",-1966190681),gf=new W(null,"fallback-impl","fallback-impl",-1501286995),bb=new W(null,"flush-on-newline","flush-on-newline",-151457939),cb=new W(null,"readably","readably",1129599760),$e=new W(null,"more-marker","more-marker",-14717935),gb=new W(null,"print-length","print-length",1931866356),ff=new W(null,"alt-impl","alt-impl",670969595);var jf=!Aa||Aa&&(ya()||9<=Na),kf=Aa&&!Ja("9");!Ea||Ja("528");Da&&Ja("1.9b")||Aa&&Ja("8")||za&&Ja("9.5")||Ea&&Ja("528");Da&&!Ja("8")||Aa&&Ja("9");function lf(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.ob=!1}lf.prototype.stopPropagation=function(){this.ob=!0};lf.prototype.preventDefault=function(){this.defaultPrevented=!0};function mf(a){mf[" "](a);return a}mf[" "]=function(){};function nf(a,b){lf.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.charCode=this.keyCode=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.Pa=this.state=null;if(a){var c=this.type=a.type;this.target=a.target||a.srcElement;this.currentTarget=b;var d=a.relatedTarget;if(d){if(Da){var e;a:{try{mf(d.nodeName);e=!0;break a}catch(f){}e=!1}e||(d=null)}}else"mouseover"==
c?d=a.fromElement:"mouseout"==c&&(d=a.toElement);this.relatedTarget=d;this.offsetX=Ea||void 0!==a.offsetX?a.offsetX:a.layerX;this.offsetY=Ea||void 0!==a.offsetY?a.offsetY:a.layerY;this.clientX=void 0!==a.clientX?a.clientX:a.pageX;this.clientY=void 0!==a.clientY?a.clientY:a.pageY;this.screenX=a.screenX||0;this.screenY=a.screenY||0;this.button=a.button;this.keyCode=a.keyCode||0;this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;
this.metaKey=a.metaKey;this.state=a.state;this.Pa=a;a.defaultPrevented&&this.preventDefault()}}(function(){function a(){}a.prototype=lf.prototype;nf.tb=lf.prototype;nf.prototype=new a;nf.prototype.constructor=nf;nf.Ta=function(a,c,d){for(var e=Array(arguments.length-2),f=2;f<arguments.length;f++)e[f-2]=arguments[f];return lf.prototype[c].apply(a,e)}})();nf.prototype.stopPropagation=function(){nf.tb.stopPropagation.call(this);this.Pa.stopPropagation?this.Pa.stopPropagation():this.Pa.cancelBubble=!0};
nf.prototype.preventDefault=function(){nf.tb.preventDefault.call(this);var a=this.Pa;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,kf)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var of="closure_listenable_"+(1E6*Math.random()|0),qf=0;function rf(a,b,c,d,e){this.listener=a;this.ab=null;this.src=b;this.type=c;this.fb=!!d;this.mb=e;this.key=++qf;this.Sa=this.eb=!1}function sf(a){a.Sa=!0;a.listener=null;a.ab=null;a.src=null;a.mb=null};function tf(a){this.src=a;this.ha={};this.bb=0}tf.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.ha[f];a||(a=this.ha[f]=[],this.bb++);var h=uf(a,b,d,e);-1<h?(b=a[h],c||(b.eb=!1)):(b=new rf(b,this.src,f,!!d,e),b.eb=c,a.push(b));return b};tf.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.ha))return!1;var e=this.ha[a];b=uf(e,b,c,d);return-1<b?(sf(e[b]),ma.splice.call(e,b,1),0==e.length&&(delete this.ha[a],this.bb--),!0):!1};
function uf(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.Sa&&f.listener==b&&f.fb==!!c&&f.mb==d)return e}return-1};var vf="closure_lm_"+(1E6*Math.random()|0),wf={},xf=0;function yf(a,b,c,d,e){if("array"==r(b))for(var f=0;f<b.length;f++)yf(a,b[f],c,d,e);else if(c=zf(c),a&&a[of])a.Yb(b,c,d,e);else{if(!b)throw Error("Invalid event type");var f=!!d,h=Af(a);h||(a[vf]=h=new tf(a));c=h.add(b,c,!1,d,e);c.ab||(d=Bf(),c.ab=d,d.src=a,d.listener=c,a.addEventListener?a.addEventListener(b.toString(),d,f):a.attachEvent(Cf(b.toString()),d),xf++)}}
function Bf(){var a=Df,b=jf?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b}function Cf(a){return a in wf?wf[a]:wf[a]="on"+a}function Ef(a,b,c,d){var e=!0;if(a=Af(a))if(b=a.ha[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.fb==c&&!f.Sa&&(f=Ff(f,d),e=e&&!1!==f)}return e}
function Ff(a,b){var c=a.listener,d=a.mb||a.src;if(a.eb&&"number"!=typeof a&&a&&!a.Sa){var e=a.src;if(e&&e[of])e.Zb(a);else{var f=a.type,h=a.ab;e.removeEventListener?e.removeEventListener(f,h,a.fb):e.detachEvent&&e.detachEvent(Cf(f),h);xf--;if(f=Af(e)){var h=a.type,k;if(k=h in f.ha){k=f.ha[h];var l=na(k,a),m;(m=0<=l)&&ma.splice.call(k,l,1);k=m}k&&(sf(a),0==f.ha[h].length&&(delete f.ha[h],f.bb--));0==f.bb&&(f.src=null,e[vf]=null)}else sf(a)}}return c.call(d,b)}
function Df(a,b){if(a.Sa)return!0;if(!jf){var c;if(!(c=b))a:{c=["window","event"];for(var d=ca,e;e=c.shift();)if(null!=d[e])d=d[e];else{c=null;break a}c=d}e=c;c=new nf(e,this);d=!0;if(!(0>e.keyCode||void 0!=e.returnValue)){a:{var f=!1;if(0==e.keyCode)try{e.keyCode=-1;break a}catch(h){f=!0}if(f||void 0==e.returnValue)e.returnValue=!0}e=[];for(f=c.currentTarget;f;f=f.parentNode)e.push(f);for(var f=a.type,k=e.length-1;!c.ob&&0<=k;k--){c.currentTarget=e[k];var l=Ef(e[k],f,!0,c),d=d&&l}for(k=0;!c.ob&&
k<e.length;k++)c.currentTarget=e[k],l=Ef(e[k],f,!1,c),d=d&&l}return d}return Ff(a,new nf(b,this))}function Af(a){a=a[vf];return a instanceof tf?a:null}var Gf="__closure_events_fn_"+(1E9*Math.random()>>>0);function zf(a){if("function"==r(a))return a;a[Gf]||(a[Gf]=function(b){return a.handleEvent(b)});return a[Gf]};if("undefined"===typeof Hf){var Hf,If=new ab(null,1,[hf,!1],null);Hf=Fd?Fd(If):Ed.call(null,If)}var Va=document.body;function Jf(a){var b=(a=Oa(a,void 0,void 0)[0])||document,c=null;return(c=b.getElementsByClassName?b.getElementsByClassName("toggle-menu")[0]:b.querySelectorAll&&b.querySelector?b.querySelector(".toggle-menu"):Oa("*","toggle-menu",a)[0])||null}
(function(){if(w(hf.f(wc.f?wc.f(Hf):wc.call(null,Hf))))return null;Kd.A(Hf,Oc,hf,!0);FastClick.attach(Va);for(var a=M(new Vd(null,2,5,ae,["header","footer"],null)),b=null,c=0,d=0;;)if(d<c){var e=b.M(null,d),f=Jf(e);yf(f,"click",function(a,b,c,d,e,f,h){return function(){var a=[C("show-"),C(h),C("-menu")].join("");return Ua(a)}}(a,b,c,d,f,"click",e));d+=1}else{var h=M(a);if(h){f=h;if(Wc(f))a=Wb(f),d=Xb(f),b=a,c=U(a),a=d;else{var e=O(f),k=Jf(e);yf(k,"click",function(a,b,c,d,e,f,h){return function(){var a=
[C("show-"),C(h),C("-menu")].join("");return Ua(a)}}(a,b,c,d,k,"click",e,f,h));a=P(f);b=null;c=0}d=0}else return null}})();