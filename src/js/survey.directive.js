(function() {
    'use strict';

    angular.module('kata').directive('survey', SurveyDirective);

    SurveyDirective.$inject = ['SurveyService'];
    function SurveyDirective(SurveyService) {
        let $ = angular.element;

        return {
            restrict: 'E',
            template: `<main class='survey'><ul class='top-level'></ul></main>`,
            link: render
        };

        function render(scope, element) {
            let variables = {};

            SurveyService.getVariables()
                .then(function(data) {
                    variables = data.index;
                    return SurveyService.getOrder();
                })
                .then(function(order) {
                    order.graph.forEach(function(item) {
                        buildLevel(item, element[0].querySelector('.top-level'), variables);
                    });
                })
                .catch(function(err) {
                    console.warn(err);
                    element.html(`<p class='error'>There was a problem retrieving survey data.</p>`);
                });
        }

        function buildLevel(data, parent, variables) {
            if (typeof(data) === 'string' && variables[data]) {
                $(parent).append(`<li><h3>${variables[data].name}</h3></li>`);
            } else if (typeof(data) === 'object') {
                let title = Object.keys(data)[0];
                let newItem = document.createElement('li');
                let container = $(newItem).html(`<h2>${title}</h2><ul></ul>`).find('ul');
                $(parent).append(newItem);
                if (Array.isArray(data[title])) {
                    data[title].forEach(function(item) {
                        buildLevel(item, container, variables);
                    });
                }
            }
        }

    }

})();
