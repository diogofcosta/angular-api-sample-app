angular.module('myApp.controllers', []).
controller('questionsController', function($scope, blissAPIservice) {
    //test call to the service see if it's working
    // blissAPIservice.checkHealth()
    // .then(response => {
    //     console.log("Hooray a response!" + response)
    // })
    // .catch(error => {
    //     console.log("Oh noes! An error!" + error)
    // })

    //let's first get all the questions without any params, and list them
    blissAPIservice.getQuestions()
    .then(response => {
        console.log(response.data)
        $scope.questionsList = response.data;
    })
    .catch(error => {
        console.error(error)
        //TODO: handle error
    })

    $scope.searchFiltered = () => {
        //called when there's a change in the input text... we need to hit the endpoint to list the questions
        //but with the new parameter to filter
        console.log("we are supposed to call the list questions endpoint now with the value "+$scope.questionFilter)

        //save the context
        let self = this

        if(self.requestRunning) {
            //if we are already running a request then let's not do another one and wait for it to finish processing
            console.log("new event but request is running so let's return!")
            return
        }

        //let's not allow search to go through unless we have at least 3 chars to prevent spamming requests
        if($scope.questionFilter.length >= 3) {
            console.log("valid search let's do it!");
            self.requestRunning = true

            blissAPIservice.getQuestions(0, $scope.questionFilter) //offset is 0 cause it's a "new" search
            .then(response => {
                console.log(response.data)
                $scope.questionsList = response.data;
            })
            .catch(error => {
                console.error(error)
                //TODO: handle error
            })
            .finally(() => {
                //we need to set the requestRunning to false to signal we're not waiting on a request anymore
                console.log("called finally! let's reset the request flag")
                self.requestRunning = false
            })
        }
    };
});