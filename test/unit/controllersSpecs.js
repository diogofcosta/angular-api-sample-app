'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'))
  beforeEach(module('myApp.services'))


  it('loadingScreenController should be defined', inject(function($controller) {
    //spec body
    var loadingScreenController = $controller('loadingScreenController', { $scope: {} })
    expect(loadingScreenController).toBeDefined()
  }))

  it('questionsController should be defined', inject(function($controller) {
    //spec body
    var questionsController = $controller('questionsController', { $scope: {} })
    expect(questionsController).toBeDefined()
  }))

  it('detailedQuestionController should be defined', inject(function($controller) {
    //spec body
    var detailedQuestionController = $controller('detailedQuestionController', { $scope: {} })
    expect(detailedQuestionController).toBeDefined()
  }))  
});