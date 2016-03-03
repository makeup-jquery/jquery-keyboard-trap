/**
* @file jQuery singleton traps keyboard focus cycle within given element's interactive children
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @version 0.2.2
* @requires jquery
* @requires @ebay/jquery-focusable
* @requires @ebay/jquery-focus-exit
*/
(function($, window, document, undefined) {

    var pluginName = 'jquery-keyboard-trap';

    var trapTemplate = '<div tabindex="0" class="keyboard-trap-boundary">';
    var $topTrap = $(trapTemplate);
    var $outerTrapBefore = $(trapTemplate);
    var $innerTrapBefore = $(trapTemplate);
    var $innerTrapAfter = $(trapTemplate);
    var $outerTrapAfter = $(trapTemplate);
    var $botTrap = $(trapTemplate);
    var $trap;
    var $firstTabElement;
    var $lastTabElement;
    var defaults = {
        deactivateOnFocusExit: false
    };

    $topTrap.on('focus', setFocusToFirstFocusableElement);
    $outerTrapBefore.on('focus', setFocusToFirstFocusableElement);
    $innerTrapBefore.on('focus', setFocusToLastFocusableElement);
    $innerTrapAfter.on('focus', setFocusToFirstFocusableElement);
    $outerTrapAfter.on('focus', setFocusToLastFocusableElement);
    $botTrap.on('focus', setFocusToLastFocusableElement);

    function setFocusToFirstFocusableElement() {
        $firstTabElement.focus();
    }

    function setFocusToLastFocusableElement() {
        $lastTabElement.focus();
    }

    /**
    * @method "jQuery.trapKeyboard"
    * @param {options}
    * @param {boolean} options.deactivateOnFocusExit - deactivate focus trap when mouse user interacts with rest of page (default: false)
    * @fires keyboardTrap - when trap is activated
    * @fires keyboardUntrap - when trap is deactivated
    * @return {Object} chainable jQuery class
    */
    $.trapKeyboard = function trapKeyboard(el, options) {
        var opts = $.extend({}, defaults, options);
        var $focusable;

        $.untrapKeyboard();

        $trap = $(el);
        $focusable = $trap.focusable();
        $firstTabElement = $focusable.first();
        $lastTabElement = $focusable.last();

        if (opts.deactivateOnFocusExit === true) {
            $trap.focusExit();

            $trap.one('focusExit', function(e) {
                if (opts.deactivateOnFocusExit === true) {
                    $.untrapKeyboard();
                }
            });
        }

        $('body').prepend($topTrap);
        $outerTrapBefore.insertBefore($trap);
        $trap.prepend($innerTrapBefore);
        $trap.append($innerTrapAfter);
        $outerTrapAfter.insertAfter($trap);
        $('body').append($botTrap);

        $trap.addClass('keyboard-trap--active');
        $trap.trigger('keyboardTrap');

        return $trap;
    };

    $.untrapKeyboard = function untrapKeyboard() {
        if ($trap !== undefined) {
            $topTrap.detach();
            $outerTrapBefore.detach();
            $innerTrapBefore.detach();
            $innerTrapAfter.detach();
            $outerTrapAfter.detach();
            $botTrap.detach();

            $trap.off('focusExit');
            $trap.removeClass('keyboard-trap--active');
            $trap.trigger('keyboardUntrap');
        }
        return $trap;
    };

}(jQuery, window, document));

/**
* The jQuery plugin namespace.
* @external "jQuery.fn"
* @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
*/

/**
* keyboardTrap event
*
* @event keyboardTrap
* @type {object}
* @property {object} event - event object
*/

/**
* keyboardUntrap event
*
* @event keyboardUntrap
* @type {object}
* @property {object} event - event object
*/
