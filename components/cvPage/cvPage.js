/* global angular */
(function() {
    "use strict";

    angular.module("component.cvPage", [])
        .directive("cvPage", cvPage);

    cvPage.$inject = ["COMPONENTS_TPL_BASE"];
    function cvPage(COMPONENTS_TPL_BASE) {
        var directive = {
            restrict: "E",
            scope: {

            },
            controllerAs: "data",
            bindToController: true,
            //TODO: solve issues with caching of templates for reusable comps
            templateUrl: COMPONENTS_TPL_BASE + "cvPage/cvPage.html",
            controller: CVPageController
        };
        return directive;
    }//directive
    /// Directive Controller ///////////////////////////////////
    CVPageController.$inject = ["$scope", "$window", "$http", "KEY_CODES_CONSTANTS"];
    function CVPageController($scope, $window, $http, KEY_CODES_CONSTANTS) {

        $scope.milestones = {};
        $http.get("data/milestones.json")
            .then(function(response) {
                //First function handles success
                $scope.milestones = response.data.milestones;
            }, function(response) {
                //Second function handles error
                $scope.milestones = "Something went wrong";
            });

            

        $scope.handleKeyDown = function($event) {
            if ($event.keyCode === KEY_CODES_CONSTANTS.A || $event.keyCode === KEY_CODES_CONSTANTS.S) {
                $scope.move($event.keyCode === KEY_CODES_CONSTANTS.A ? false : true);
            }
        };

        $scope.move = function(moveForward) {
            if (!$scope.shouldDraw) {
                $scope.shouldDraw = true;
                startDraw(moveForward);
            } else {
                // already drawing, increase the step
                step *= 1.1;
            }
        };
        
        $scope.stopMoving = function() {
             $scope.shouldDraw = false;
        };


        var currentAnimationCycleRef;
        function startDraw(goForward) {

            currentAnimationCycleRef = $window.requestAnimationFrame(onAnimationTick);
            var lastDrawTimeStamp = null;

            function onAnimationTick(timeStamp) {
                if (lastDrawTimeStamp === null) {
                    lastDrawTimeStamp = timeStamp;
                }
                var timePassed = timeStamp - lastDrawTimeStamp;

                animateValuesTick(timePassed, goForward);
                if ($scope.shouldDraw) {
                    currentAnimationCycleRef = $window.requestAnimationFrame(onAnimationTick);
                } else {
                    endDrawCallback();
                }
            }
        }
        var DEFAULT_STEP = 5;
        var maxLeftCss = 0; // todo: should be pane width - 0.5 screen size width 
        var minLeftCss = -13500;
        var step = DEFAULT_STEP;
        function animateValuesTick(timePassed, goForward) {
            $scope.leftCss = Math.min(Math.max($scope.leftCss + (goForward ? -step : step), minLeftCss), maxLeftCss);
            console.log("Left: " + $scope.leftCss);
            $scope.$digest();
        }

        function endDrawCallback() {
            console.log("End draw!");
            // reset step
            step = DEFAULT_STEP;
        }

        $scope.getLeftCss = function() {
            var styleObject = {};
            styleObject.left = $scope.leftCss + "px";
            console.log("Setting left: " + $scope.leftCss);
            return styleObject;
        };

        $scope.leftCss = 0;



    }//CVPageController
} ());