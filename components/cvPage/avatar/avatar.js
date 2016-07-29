/* global angular */
(function() {
    "use strict";

    angular.module("component.avatar", [])
        .directive("avatar", avatar);

    avatar.$inject = ["COMPONENTS_TPL_BASE"];
    function avatar(COMPONENTS_TPL_BASE) {
        var directive = {
            restrict: "E",
            scope: {
                 rotation: "=", 
                 direction: "@"
            },
            controllerAs: "data",
            bindToController: true,
            templateUrl: COMPONENTS_TPL_BASE + "cvPage/avatar/avatar.html",
            controller: AvatarController
        };
        return directive;
    }//directive
    /// Directive Controller ///////////////////////////////////
    AvatarController.$inject = ["$scope"];
    function AvatarController($scope) {
        // Create a variable to store the transform value
        $scope.chainWheelStyle = {};
        
        $scope.$watchGroup(['data.rotation', 'direction'], function(newValues, oldValues) {
            
            var currentRotation = newValues[0];
            if (angular.isUndefined(currentRotation)) {
                return;
            }
            var direction = newValues[1];
            var directionFactor = direction === "left" ? -1 : 1;
            var rotateStyleString = "rotate("+currentRotation/2 * -1+"deg)";
            var newRotationStyle = {};
            newRotationStyle.transform = rotateStyleString;
            newRotationStyle['-webkit-transform'] = rotateStyleString;
            newRotationStyle['-ms-transform'] = rotateStyleString;
            $scope.chainWheelStyle = newRotationStyle;
        });
       
       

    }//AvatarController
} ());