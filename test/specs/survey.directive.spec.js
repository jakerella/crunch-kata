(function() {
    'use strict';

    let expect = chai.expect;

    describe('survey directive', function() {
        let $compile, $rootScope;
        let mockSurveyService = {};
        let orderFixture, variablesFixture;
        let $ = angular.element;

        beforeEach(module('kata'));
        beforeEach(module(function($provide) {
            $provide.value('SurveyService', mockSurveyService);
        }));

        beforeEach(function(done) {
            fetch('base/test/fixtures/order.json')
                .then(function(res) {
                    return res.json();
                })
                .then(function(data) {
                    orderFixture = data;
                    return fetch('base/test/fixtures/variables.json');
                })
                .then(function(res) {
                    return res.json();
                })
                .then(function(data) {
                    variablesFixture = data;
                    done();
                })
                .catch(done);
        });

        beforeEach(inject(function(_$compile_, _$rootScope_, $q) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            mockSurveyService.getOrder = function getOrder() {
                return $q.resolve(orderFixture);
            };
            mockSurveyService.getVariables = function getVariables() {
                return $q.resolve(variablesFixture);
            };
        }));

        it('should replace the directive with the template', function() {
            let elem = $compile('<survey></survey>')($rootScope);
            $rootScope.$digest();
            let elemMain = elem[0].querySelector('.survey');
            expect(elemMain).to.not.be.null;
            expect(elemMain.tagName).to.equal('MAIN');
            expect($(elemMain).find('h2').length).to.equal(8);
            expect($(elemMain).find('ul').length).to.equal(9);
            expect(elem[0].querySelectorAll('main > ul > li:first-child > ul > li > ul').length).to.equal(2);
            expect(elem[0].querySelectorAll('main > ul > li:first-child > ul > li > ul')[0].querySelectorAll('li').length).to.equal(2);
            expect(elem[0].querySelectorAll('main > ul > li:first-child > ul > li > ul')[1].querySelectorAll('li').length).to.equal(2);
            expect(elem[0].querySelectorAll('main > ul > li:nth-child(2) > ul > li > ul')[0].querySelectorAll('li').length).to.equal(4);
            expect(elem[0].querySelectorAll('main > ul > li:nth-child(2) > ul > li > ul')[1].querySelectorAll('li').length).to.equal(4);
            expect($(elemMain).find('h3').length).to.equal(22);
            expect($(elemMain).find('h2')[3].innerText).to.equal('Purchase Consideration and Behavior');
            expect($(elemMain).find('h3')[5].innerText).to.equal('Likely Purchase');
        });

    });

})();
