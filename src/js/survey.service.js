(function() {
    'use strict';

    angular.module('kata').factory('SurveyService', SurveyService);

    SurveyService.$inject = ['$http', '$q', 'endpoints'];
    function SurveyService($http, $q, endpoints) {
        let order, variables;

        return {
            getOrder,
            getVariables,
            getOrderForVariable
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

        /**
         * Retrieves the variable data from the API. Note that if already
         * retrieved, the cached version will be supplied.
         *
         * @return {Promise}         Will resolve with the variable data, or reject with HTTP error
         */
        function getVariables() {
            if (variables) {
                return $q.resolve(variables);
            }

            return $http({ url: endpoints.variables })
                .then(function processData(response) {
                    variables = response.data;
                    return variables;
                });
        }

        /**
         * Retrieves the order for the given variable name. This order will be an
         * array of the positions within the hierarchy. For example, a value of:
         * [1, 0, 2]
         * would indicate the variable is in the third position within the first
         * subgroup, under the second top level heading (reading from right to left).
         *
         * @param  {String} name The name of the variable to find the order of
         * @return {Promise}     Resolves with the order this variable appears in the hierarchy, from the top level down
         */
        function getOrderForVariable(name) {
            if (typeof(name) !== 'string' || !name.length) {
                return $q.reject('Please provide the variable name');
            }

            return getOrder()
                .then(function(order) {
                    return findVariable(order.graph, name);
                });

            function findVariable(collection, search, hierOrder = []) {
                if (!Array.isArray(collection)) {
                    return hierOrder;
                }

                collection.forEach(function(element, i) {
                    if (element === search) {
                        hierOrder.push(i);
                        
                    } else if (angular.toJson(element).includes(`"${search}"`)) {
                        // This JSON check prevents us from needlessly digging deeper
                        // into a nested structure that does not contain our variable name

                        hierOrder.push(i);
                        findVariable(element[Object.keys(element)[0]], search, hierOrder);
                    }
                });
                return hierOrder;
            }
        }

    }

})();
