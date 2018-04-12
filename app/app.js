angular.module('myApp', [
  'myApp.services',
  'myApp.controllers',
  'ngRoute'
])
//let's configure the routes, if we're not at a given route here defaults back the the main list one
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
	when("/questions", {templateUrl: "partials/drivers.html", controller: "driversController"}).
	when("/questions/:id", {templateUrl: "partials/driver.html", controller: "driverController"}).
	otherwise({redirectTo: '/questions'});
}]);
