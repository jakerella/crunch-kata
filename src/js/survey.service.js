(function() {
    'use strict';

    angular.module('kata').factory('SurveyService', SurveyService);

    SurveyService.$inject = ['$http', '$q', 'endpoints'];
    function SurveyService($http, $q, endpoints) {
        let order;

        return {
            getOrder
        };

        /**
         * Retrieves the order data from the API. Note that if already
         * retrieved, the cached version will be supplied.
         *
         * @return {Promise}         Will resolve with the order data, or reject with HTTP error
         */
        function getOrder() {
            if (order) {
                return $q.resolve(order);
            }

            return $http({ url: endpoints.order })
                .then(function processData(response) {
                    order = response.data;
                    return order;
                });
        }

    }

})();
