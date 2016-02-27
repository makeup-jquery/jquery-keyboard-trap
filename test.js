data.forEach(function(data) {
    describe("when trap is activated", function() {
        beforeAll(function() {
            setupSuite(data);
        });
        it("should have class keyboard-trap--active on trap", function() {
            expect($trap.hasClass('keyboard-trap--active')).toEqual(true);
        });
        it("should have six trap boundaries in body", function() {
            expect($('.keyboard-trap-boundary').length).toEqual(6);
        });
    });
    describe("when trap is deactivated", function() {
        beforeAll(function() {
            setupSuite(data);
            $.untrapKeyboard();
        });
        it("should have zero trap boundaries in body", function() {
            expect($('.keyboard-trap-boundary').length).toEqual(0);
        });
        it("should not have class keyboard-trap--active on trap", function() {
            expect($trap.hasClass('keyboard-trap--active')).toEqual(false);
        });
        it("should trigger keyboardUntrap event", function() {
            expect(onKeyboardUntrap).toHaveBeenCalled();
        });
    });
    describe("when focus exits trap root when deactivateOnFocusExit=true", function() {
        beforeAll(function() {
            setupSuite(data, {deactivateOnFocusExit:true});
            $trap.focus();
            $body.attr('tabindex', '-1').focus();
        });
        it("should trigger keyboardUntrap event", function(done) {
            setTimeout(function() {
                expect(onKeyboardUntrap).toHaveBeenCalled();
                done();
            }, timeoutInterval);
        });
    });
    describe("when focus exits trap root when deactivateOnFocusExit=false", function() {
        beforeAll(function() {
            setupSuite(data, {deactivateOnFocusExit:false});
            $trap.focus();
            $body.attr('tabindex', '-1').focus();
        });
        it("should not trigger keyboardUntrap event", function(done) {
            setTimeout(function() {
                expect(onKeyboardUntrap).not.toHaveBeenCalled();
                done();
            }, timeoutInterval);
        });
    });
    describe("when focus exits trap descendant with deactivateOnFocusExit=true", function() {
        beforeAll(function() {
            setupSuite(data, {deactivateOnFocusExit:true});
            $body.attr('tabindex', '-1').focus();
        });
        it("should trigger keyboardUntrap event", function(done) {
            setTimeout(function() {
                expect(onKeyboardUntrap).toHaveBeenCalled();
                done();
            }, timeoutInterval);
        });
    });
    describe("when focus exits trap descendant with deactivateOnFocusExit=false", function() {
        beforeAll(function() {
            setupSuite(data, {deactivateOnFocusExit:false});
            $body.attr('tabindex', '-1').focus();
        });
        it("should trigger keyboardUntrap event", function(done) {
            setTimeout(function() {
                expect(onKeyboardUntrap).not.toHaveBeenCalled();
                done();
            }, timeoutInterval);
        });
    });
});
