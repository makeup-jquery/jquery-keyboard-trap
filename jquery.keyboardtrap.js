/**
* @name @ebay/jquery-keyboard-trap
* @function $.trapKeyboard
* @version 0.1.6
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @desc Traps keyboard focus cycle within element's interactive children.
* @requires jquery-focusable
* @requires jquery-focus-exit
* @param {options}
* @param {boolean} options.deactivateOnFocusExit - deactivate focus trap when
* mouse user interacts with rest of page (default: false).
*/
(function ($, window, document, undefined) {

    var trapTemplate = '<div tabindex="0" class="keyboard-trap-boundary">',
        defaults = {
            deactivateOnFocusExit: false
        },
        $topTrap = $(trapTemplate),
        $outerTrapBefore = $(trapTemplate),
        $innerTrapBefore = $(trapTemplate),
        $innerTrapAfter = $(trapTemplate),
        $outerTrapAfter = $(trapTemplate),
        $botTrap = $(trapTemplate),
        $trap,
        $firstTabElement,
        $lastTabElement;

    $topTrap.on('focus', setFocusToFirstFocusableElement);
    $outerTrapBefore.on('focus', setFocusToFirstFocusableElement);
    $innerTrapBefore.on('focus', setFocusToLastFocusableElement);
    $innerTrapAfter.on('focus', setFocusToFirstFocusableElement);
    $outerTrapAfter.on('focus', setFocusToLastFocusableElement);
    $botTrap.on('focus', setFocusToLastFocusableElement);

    function setFocusToFirstFocusableElement(){
        $firstTabElement.focus();
    }

    function setFocusToLastFocusableElement(){
        $lastTabElement.focus();
    }

    $.trapKeyboard = function trapKeyboard(el, options) {
        var opts = $.extend({}, defaults, options),
            $focusable;

        $.untrapKeyboard();

        $trap = $(el);
        $focusable = $trap.focusable();
        $firstTabElement = $focusable.first();
        $lastTabElement = $focusable.last();

        if (opts.deactivateOnFocusExit === true) {
            $trap.focusExit();

            $trap.one('focusexit', function(e) {
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
        $trap.trigger('on.keyboardTrap');

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

            $trap.off('focusexit');
            $trap.removeClass('keyboard-trap--active');
            $trap.trigger('off.keyboardTrap');
        }
        return $trap;
    };

}(jQuery, window, document));
