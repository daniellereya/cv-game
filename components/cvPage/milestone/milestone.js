/* global angular */
(function() {
    "use strict";

    angular.module("component.milestone", [])
        .directive("milestone", milestone);

    milestone.$inject = ["COMPONENTS_TPL_BASE"];
    function milestone(COMPONENTS_TPL_BASE) {
        var directive = {
            restrict: "E",
            scope: {
                 title: "@",
                 description: "=",
                 category: "@",
                 startDate: "@",
                 endDate: "@",
                 positionInPixels: "=", 
                 currentPosition: "="
            },
            controllerAs: "data",
            bindToController: true,
            templateUrl: COMPONENTS_TPL_BASE + "cvPage/milestone/milestone.html",
            controller: MilestoneController
        };
        return directive;
    }//directive
    /// Directive Controller ///////////////////////////////////
    MilestoneController.$inject = ["$scope"];
    function MilestoneController($scope) {
        var DEFAULT_MILESTONE_DELTA_PX = 150;
        $scope.getMilestoneStateClass = function(name) {
            return Math.abs($scope.data.currentPosition) + DEFAULT_MILESTONE_DELTA_PX  > $scope.data.positionInPixels ? "show" : "";
        };
       
       $scope.milestoneStyle = {};
       $scope.getMilestoneStyle = function() {
           $scope.milestoneStyle.left = $scope.data.positionInPixels;
           return $scope.milestoneStyle;
       };
       //angular.isDefined($scope.data.currentPosition) && 

    }//MilestoneController
} ());