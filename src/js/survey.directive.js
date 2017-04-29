(function() {
    'use strict';

    angular.module('kata').directive('survey', SurveyDirective);

    function SurveyDirective() {
        return {
            restrict: 'E',
            template: '<main class="survey"></main>'
        };
    }

})();
