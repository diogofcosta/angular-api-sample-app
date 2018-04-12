angular.module('myApp.controllers', []).
controller('questionsController', function($scope, blissAPIservice) {
    //test call to the service see if it's working
    blissAPIservice.checkHealth()
    .then(response => {
        console.log("Hooray a response!" + response)
    })
    .catch(error => {
        console.log("Oh noes! An error!" + error)
    })
   
    $scope.questionsList = [
        {
            name: "question??",
        },
        {
            name: "question again??",
        },
        {
            name: "and question yet again??",
        }
        // {
        //     Driver: {
        //     givenName: 'Fernando',
        //         familyName: 'Alonso'
        //     },
        //     points: 207,
        //     nationality: "Spanish",
        //     Constructors: [
        //         {name: "Ferrari"}
        //     ]
        // }
    ];
});