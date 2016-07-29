/* global angular */
(function() {
    "use strict";

    angular.module("component.aboutPage", [])
        .directive("aboutPage", aboutPage);

    aboutPage.$inject = ["COMPONENTS_TPL_BASE"];
    function aboutPage(COMPONENTS_TPL_BASE) {
        var directive = {
            restrict: "E",
            scope: {

            },
            controllerAs: "data",
            bindToController: true,
            //TODO: solve issues with caching of templates for reusable comps
            templateUrl: COMPONENTS_TPL_BASE + "aboutPage/aboutPage.html",
            controller: AboutPageController
        };
        return directive;
    }//directive
    /// Directive Controller ///////////////////////////////////
    AboutPageController.$inject = ["$scope"];
    function AboutPageController($scope) {

        var c = document.getElementById("cv-canvas");
        var ctx = c.getContext("2d");
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();

    }//AboutPageController
} ());