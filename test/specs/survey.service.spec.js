(function() {
    'use strict';

    let expect = chai.expect;

    describe('survey service', function() {
        let $httpBackend, SurveyService;
        let orderFixture;

        beforeEach(module('kata'));

        beforeEach(function(done) {
            fetch('base/test/fixtures/order.json')
                .then(function(res) {
                    return res.json();
                })
                .then(function(data) {
                    orderFixture = data;
                    done();
                })
                .catch(done);
        });

        beforeEach(inject(function(_$httpBackend_, _SurveyService_, endpoints) {
            $httpBackend = _$httpBackend_;
            SurveyService = _SurveyService_;

            $httpBackend
                .whenGET(endpoints.order)
                .respond(orderFixture);
        }));

        it('should be able to get order data from the API', function(done) {

            let result = SurveyService.getOrder();
            expect(result).to.be.an('object');
            expect(result.then).to.be.an('function');
            expect(result.catch).to.be.an('function');

            result
                .then(function(data) {
                    expect(data).to.be.a('object');
                    expect(data.element).to.equal('shoji:order');
                    done();
                })
                .catch(done);

            $httpBackend.flush();
        });

    });

})();
