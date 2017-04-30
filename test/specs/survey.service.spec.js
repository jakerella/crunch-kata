(function() {
    'use strict';

    let expect = chai.expect;

    describe('survey service', function() {
        let $httpBackend, SurveyService;
        let orderFixture, variablesFixture;

        beforeEach(module('kata'));

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

        beforeEach(inject(function(_$httpBackend_, _SurveyService_, endpoints) {
            $httpBackend = _$httpBackend_;
            SurveyService = _SurveyService_;

            $httpBackend
                .whenGET(endpoints.order)
                .respond(orderFixture);

            $httpBackend
                .whenGET(endpoints.variables)
                .respond(variablesFixture);
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

        it('should be able to get variables data from the API', function(done) {

            let result = SurveyService.getVariables();
            expect(result).to.be.an('object');
            expect(result.then).to.be.an('function');
            expect(result.catch).to.be.an('function');

            result
                .then(function(data) {
                    expect(data).to.be.a('object');
                    expect(data.element).to.equal('shoji:catalog');
                    done();
                })
                .catch(done);

            $httpBackend.flush();
        });

        it('should be able to get the order for a given variable', function(done) {

            let result = SurveyService.getOrderForVariable('0f6ce0');  // [1,0,2]

            expect(result).to.be.an('object');
            expect(result.then).to.be.an('function');
            expect(result.catch).to.be.an('function');

            result
                .then(function(order) {
                    expect(order).to.be.an('array').and.to.have.property('length').that.equals(3);
                    expect(order[0]).to.equal(1);
                    expect(order[1]).to.equal(0);
                    expect(order[2]).to.equal(2);
                    done();
                })
                .catch(done);

            $httpBackend.flush();
        });

        it('should be able to get the order for a variable at the root level', function(done) {

            let result = SurveyService.getOrderForVariable('d0fe8b');  // [4]

            expect(result).to.be.an('object');
            expect(result.then).to.be.an('function');
            expect(result.catch).to.be.an('function');

            result
                .then(function(order) {
                    expect(order).to.be.an('array').and.to.have.property('length').that.equals(1);
                    expect(order[0]).to.equal(4);
                    done();
                })
                .catch(done);

            $httpBackend.flush();
        });

    });

})();
