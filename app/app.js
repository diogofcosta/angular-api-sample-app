angular.module('myApp', [
  'myApp.services',
  'myApp.controllers',
  'ngRoute',
  'infinite-scroll'
])
//let's configure the routes, if we're not at a given route here defaults back the the main list one
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when("/", {templateUrl: "templates/loading-screen.html", controller: "loadingScreenController"})
  .when("/questions:question_id?", {templateUrl: "templates/list-questions.html" ,controller: "questionsController"})
  .when("/questions/:question_id", {templateUrl: "templates/detailed-question.html" ,controller: "detailedQuestionController"})
  .otherwise({redirectTo: '/'})
}])

// you might call this after your module initalization
/**
 * Scroll events can be triggered very frequently, which can hurt performance and make 
 * scrolling appear jerky. To mitigate this, infiniteScroll can be configured to process 
 * scroll events a maximum of once every x milliseconds:
 */
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)
