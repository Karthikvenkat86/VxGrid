(function () {
    'use strict';

    angular
        .module('vxSample')
        .directive('validation', [ValidationDirective]);

    function ValidationDirective() {
        return {
            restrict: 'EA',
            require: '?^^form',
            replace: true,
            transclude: true,
            priority: 1001,
            scope: true,
            templateUrl: '/dist/js/validation.directive.html',
            link: function (scope, elem, attrs, ctrls) {
                var name = attrs.for;
                var validationMessage = attrs.message;
                var maxlimit = attrs.maxlimit;
                var minlimit = attrs.minlimit;
                var dateOption = attrs.dateoptions;
                if (ctrls != null && !_.isUndefined(ctrls) && !_.isUndefined(ctrls[name])) {
                    var unbind = scope.$watchCollection(ctrls.$name + '.' + name + '.$error', function (isValid) {
                        determineValidity(scope, ctrls[name], validationMessage, maxlimit, minlimit, dateOption);
                    }, true);

                    scope.$on('$destroy', unbind);
                }
            }
        };
    }

    function getMessage(errors, inputValue, validationMessage, maxlimit, minlimit, dateOption) {

        if (errors.max) {
            return "Enter value less than equal to " + maxlimit;
        }
        else if (errors.min) {
            return "Enter value more than equal to " + minlimit;
        }
        else if (errors.pattern || errors.number) {

            return validationMessage;
        }
        else if (errors.maxlength) {
            return "Enter less than equal to " + maxlimit + " characters";
        }
        else if (errors.minlength) {
            return "Enter greater than equal to " + minlimit + " characters";
        }
        else if (errors.date && dateOption == 'Month') {
            return "Date format should be Month. Use calendar icon to select month.";
        }
        else if (errors.date) {
            return "Date format should be DD Mon YYYY. Use calendar icon to select date.";
        }
        else if(errors.minStartDate){
            return validationMessage;
        }
        else if (errors.required)
            return "This is mandatory field.";
        else if (errors.parse && errors.editable)
            return "Please select a valid value from the list.";

    }

    function determineValidity(scope, input, validationMessage, maxlimit, minlimit, inputName) {
        //var hasBeenInteracted = !input.$pristine;
        //hasBeenInteracted = hasBeenInteracted && (input.$dirty);

        //if (hasBeenInteracted) {
        console.log('bnhuguhguigi');
            scope.valid = input.$valid;  //hasBeenInteracted && ;
            scope.message = getMessage(input.$error, input.$viewValue, validationMessage, maxlimit, minlimit, inputName);
        //}
    }


})();
