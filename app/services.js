angular.module('myApp.services', [])
.factory('apiUrlHttpInterceptor', function () {
    //interceptor based on: https://github.com/VasilioRuzanni/angular-modelizer/issues/3
    // This interceptor will basically inject the baseURL of the api on all the requests that are called from it
    var apiUrl = 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com'; 

    var shouldPrependApiUrl = function (reqConfig) {
        if (!apiUrl) return false
        return !(/[\s\S]*.html/.test(reqConfig.url) ||
                (reqConfig.url && reqConfig.url.indexOf(apiUrl) === 0))
    }

    return {
        request: function (reqConfig) {
        // Filter out requests for .html templates, etc
        if (apiUrl && shouldPrependApiUrl(reqConfig)) {
            reqConfig.url = apiUrl + reqConfig.url
        }

        return reqConfig
        }
    }
})

.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('apiUrlHttpInterceptor');
}])

.factory('blissAPIservice', function($http) {
    /*
        Service responsible for communication with the mock api using $http
    */

    var blissAPI = {}

    //endpoint to check server health
    blissAPI.checkHealth = () => {
        return $http({
            method: 'GET',
            url: '/health'
        })
    }

    //endpoint to get the list of questions (no params yet)
    blissAPI.getQuestions = (offset, filter) => {
        console.log("blissAPI service called getQuestions with params offset: "+offset+" and filter:"+filter)
      return $http({
        method: 'GET', 
        url: '/questions',
        params: {
            limit: 10, //the functional requirement is that we ask for 10 records at a time, which we could parametrize into a config file
            offset: offset,
            filter: filter //assuming filter is working on the API then we get results filtered by this
        } 
      })
    }

    return blissAPI;
  });