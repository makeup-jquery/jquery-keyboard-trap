describe("jquery.keyboardtrap.js", function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

    var timeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL - 500;

    var dom = '<button id="outerButton"></button>'
            + '<div id="trap" tabindex="0"><button id="innerButton"></button></div>';

    var $trap,
        $outerButton,
        $innerButton;

    var eventHandlerMocks = {
        onDeactivate : function(e) {},
        onInnerButtonFocus : function(e) {},
        onOuterButtonFocus : function(e) {}
    };

    beforeEach(function() {
        $('body').empty().append($(dom));

        $trap = $('#trap');
        $outerButton = $('#outerButton');
        $innerButton = $('#innerButton');
    });

    it("should have class keyboard-trap--active when trapped", function() {
        $.trapKeyboard($trap);

        expect($trap.hasClass('keyboard-trap--active')).toEqual(true);
    });

    it("should have six trap boundaries when trapped", function() {
        $.trapKeyboard($trap);

        expect($('.keyboard-trap-boundary').size()).toEqual(6);
    });

    it("should have zero trap boundaries when untrapped", function() {
        $.trapKeyboard($trap);
        $.untrapKeyboard();

        expect($('.keyboard-trap-boundary').size()).toEqual(0);
    });

    it("should not have class keyboard-trap--active when untrapped", function() {
        $.trapKeyboard($trap);
        $.untrapKeyboard();

        expect($trap.hasClass('keyboard-trap--active')).toEqual(false);
    });

    it("should deactivate trap on forced focusexit from container when deactivateOnFocusExit=true", function(done) {
        // init plugin
        $.trapKeyboard($trap, {deactivateOnFocusExit:true});

        // spy on event
        spyOn(eventHandlerMocks, 'onDeactivate');

        // execute
        $trap.on('keyboardUntrap', eventHandlerMocks.onDeactivate);
        $trap.focus();
        $outerButton.focus();

        // assert
        setTimeout(function() {
            expect(eventHandlerMocks.onDeactivate).toHaveBeenCalled();
            done();
        }, timeoutInterval);
    });

    it("should not deactivate trap on forced focusexit from container when deactivateOnFocusExit=false", function(done){
        // init plugin
        $.trapKeyboard($trap, {deactivateOnFocusExit:false});

        // spy on event
        spyOn(eventHandlerMocks, 'onDeactivate');

        // execute
        $trap.on('keyboardUntrap', eventHandlerMocks.onDeactivate);
        $trap.focus();
        $outerButton.focus();

        // assert
        setTimeout(function() {
            expect(eventHandlerMocks.onDeactivate).not.toHaveBeenCalled();
            done();
        }, timeoutInterval);
    });

    it("should deactivate trap on forced focusexit from descendant when deactivateOnFocusExit=true", function(done){
        // init plugin
        $.trapKeyboard($trap, {deactivateOnFocusExit:true});

        // spy on event
        spyOn(eventHandlerMocks, 'onDeactivate');

        // execute
        $trap.on('keyboardUntrap', eventHandlerMocks.onDeactivate);
        $innerButton.focus();
        $outerButton.focus();

        // assert
        setTimeout(function() {
            expect(eventHandlerMocks.onDeactivate).toHaveBeenCalled();
            done();
        }, timeoutInterval);
    });

    it("should not deactivate trap on forced focusexit from descendant when deactivateOnFocusExit=false", function(done){
        // init plugin
        $.trapKeyboard($trap, {deactivateOnFocusExit:false});

        // spy on event
        spyOn(eventHandlerMocks, 'onDeactivate');

        // execute
        $trap.on('keyboardUntrap', eventHandlerMocks.onDeactivate);
        $innerButton.focus();
        $outerButton.focus();

        // assert
        setTimeout(function() {
            expect(eventHandlerMocks.onDeactivate).not.toHaveBeenCalled();
            done();
        }, timeoutInterval);
    });
});
