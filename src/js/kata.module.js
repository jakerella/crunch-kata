(function() {
    'use strict';

    angular.module('kata', [])
        // TODO: we need to set up a real API for these...
        .value('endpoints', {
            order: '/test/fixtures/order.json',
            variables: '/test/fixtures/variables.json'
        });

})();
