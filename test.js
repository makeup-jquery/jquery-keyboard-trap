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
});
