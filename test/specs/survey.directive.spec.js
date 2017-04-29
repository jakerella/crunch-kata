(function() {
    'use strict';

    let expect = chai.expect;

    describe('survey directive', function() {
        let $compile, $rootScope;

        beforeEach(module('kata'));

        beforeEach(inject(function(_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        }));

        it('should replace the directive with the template', function() {
            let elem = $compile('<survey></survey>')($rootScope);
            $rootScope.$digest();
            let elemMain = elem[0].querySelector('.survey');
            expect(elemMain).to.not.be.null;
            expect(elemMain.tagName).to.equal('MAIN');
        });

    });

})();
