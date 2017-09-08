/* eslint no-undef: 0 */

jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

// called by every test suite
function setupSuite(html, options) {
    // setup dom
    $('body').empty().html(html);

    // setup globals
    $body = $('body');
    $trap = $('.dialog');
    $button = $('.dialog button');
    onKeyboardUntrap = jasmine.createSpy('onKeyboardUntrap');
    timeoutInterval = 100;

    // ensure focus is within trap area before plugin is called
    $button.focus();

    // execute plugin on widget
    $.trapKeyboard($trap, options);

    // setup event handlers on widget
    $trap.on('keyboardUntrap', onKeyboardUntrap);
}
