/* Return the right transitionend event type
----------------------------- */

export const whichTransitionEvent = () => {
    let el = document.createElement('fakeelement');
    let transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    }

    for (let t in transitions) {
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
};

/* Is element in viewport?
----------------------------- */

export const isInViewport = ($el) => {
    var bounding = $el.getBoundingClientRect();
    return (
        bounding.top >= -bounding.width &&
        bounding.left >= -bounding.height &&
        bounding.bottom <= ( (window.innerHeight || document.documentElement.clientHeight) + bounding.height ) &&
        bounding.right <= ( (window.innerWidth || document.documentElement.clientWidth) + bounding.width )
    );
};

/* Debounce
----------------------------- */

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};