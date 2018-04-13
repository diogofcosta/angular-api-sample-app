angular.module('myApp.controllers', [])
.controller('loadingScreenController', function($scope, blissAPIservice, $location) {
    //function that will call the API service and check if the server is okay or not
    /**
     * Existential doubt... Couldn't we somehow use an interceptor for each request... like a middleware, to make sure that before
     * any request goes through to the API, it always calls the endpoint checkHealth and handles it accordingly?
     * I think that would potentially be a more elegant solution rather than this but time is lacking so
     * for now we do it this way
     */
    checkServer = () => {
        $scope.serverError = false
        //test call to the service see if it's working
        blissAPIservice.checkHealth()
        .then(response => {
            console.log("Hooray a response!")
            console.log(response)
            $scope.serverError = false

            if(response.status === 200) { // success server is online lets go to the questions list
                console.log("going to redirect to questions in 2 seconds")
                $location.path("/questions")
            } 
            else { // technically should return 503 if service is unavailable but this is a catchall, if its not a 200 (success) then we'll show the try again widget
                $scope.serverError = true
            }
        })
        .catch(error => {
            $scope.serverError = true
            console.log("Oh noes! An error!" + error)
        })
    }

    $scope.tryAgain = () => {
        console.log("clicked try again")
        checkServer()
    }

    checkServer()
})
.controller('questionsController', function($scope, blissAPIservice, $location) {
    console.log("loaded questions controller, params? ")
    //let's get the url params if there's any (only interested in the question_filter param)
    let searchObject = $location.search()
    console.log(searchObject)


    //this variable will "track" the number of questions that we got from the endpoint 
    //it starts at 0 and then each time we load questions we increment it by 10 so that
    //next time we request with the offset that's coming next
    $scope.questionsOffset = 0
    $scope.questionFilter = searchObject.question_filter || ''
    $scope.questionsList = []

    $scope.moreQuestions = () => {
        console.log("called moreQuestions")
        //save the context
        let self = this
        
        if (self.loadingMore) return
        self.loadingMore = true
        
        //called when are "infinite scrolling" to make sure we keep loading more and more events and add it to the list
        blissAPIservice.getQuestions($scope.questionsOffset, $scope.questionFilter)
        .then(response => {
            console.log(response.data)
            let items = response.data
            for (let i = 0; i < items.length; i++) {
              $scope.questionsList.push(items[i])
            }
            $scope.questionsOffset += 10 //offset is incremented cause we successfully loaded some questions
        })
        .catch(error => {
            console.error(error)
            //TODO: handle error
        })
        .finally(() => {
            self.loadingMore = false
        })
    }

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
            $scope.questionsOffset = 0 //offset is 0 cause it's a "new" search
            self.requestRunning = true

            blissAPIservice.getQuestions($scope.questionsOffset, $scope.questionFilter) 
            .then(response => {
                console.log(response.data)
                $scope.questionsOffset += 10 //offset is incremented cause we successfully loaded some questions
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
    }
})