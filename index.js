'use strict'



var generateResponse = function(options) {
  //This function takes in an object with the keys speechText, endSession and repromtText
  //speechText is what you want the alexa to say
  //endSession is saying whether the session should end after
  //repromptText is what the alexa should say if left inactive

  //By putting the object with these keys into the function, an object will be
  //returned that the alexa can read, and will perform the task you ask it
    var response = {
        version: "1.0",
        response: {
            outputSpeech: {
                type: "PlainText",
                text: options.speechText
            },
            shouldEndSession: options.endSession
        }
    }
    if (options.repromtText) {
        response.response.repromt = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromtText
            }
        }
    }
    return response
}

exports.handler = function(event, context){
  //This is the function that lambda will call when your alexa skill is activated
  //Event is the data coming into the function from the alexa skills kit
  //Context gives the user data of the function while it is running
  try{
    //This takes the request object off of the event object
    //The request object contains data that we need in our function
    var request = event.request

    //request types:

    //LaunchRequest - Just invocing the alexa skill
    //Ex: "Alexa, open greeter"

    //IntentRequest - Asking the alexa skill one of your intents
    //Ex: "Alexa, ask greeter to greet Brian"

    //SessionEndedRequest - Asking the alexa skill to end
    //Ex: "Alexa stop"

    if (request.type==="LaunchRequest"){
      let options = {}
      options.speechText = "Add what you want here"
      options.endSession = true //Change this to false if you don't want the session to endSession
      //options.repromptText
      context.succeed(generateResponse(options))

    }else if (request.type==="IntentRequest"){
      let options = {}
      if (request.intent.name===){//Put the name of your intent
        //options.speechText = ADD WHAT YOU WANT THE ALEXA TO SAY
        //options.repromptText = ADD WHAT YOU WANT THE REPROMPT TEXT TO BE
        //options.endSession = TRUE/FALSE IF YOU WANT THE SESSION TO endSession
        context.succeed(generateResponse(options))
      }else{
        throw("UNKNOWN INTENT: "+ request.intent.name)
      }
    }else if (request.type==="SessionEndedRequest"){
      let options = {}
      options.speechText = "Goodbye"
      options.endSession = true

      context.succeed(generateResponse(options))

    }else{
      throw("UNKNOWN REQUEST TYPE: "+request.type)
    }
  }catch(e){
    ccontext.fail("EXCEPTION: "+ e)
  }
}
