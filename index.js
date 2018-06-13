
'use strict';
var report = "";
var handlers = {
    
'LaunchRequest': function () {
    this.emit('Incorrect intent'); 
},
  
'report': function () {
    this.response.speak("What direction is the wind? Please respond 'wind direction is *'").listen("What direction is the wind? Please respond 'wind direction is *'");
    this.emit(':responseReady');
},
  
'windIntent': function() {
    let wind = this.event.request.intent.slots.wind.value;
    if (wind == "west"){
        report += "The surf is looking clean today.";
    }
    else if (wind == "northwest" || wind == "southwest"){
        report += "The surf is looking semi-clean today.";
    }
    else {
        report+= "The surf is looking choppy.";
    }
    this.response.speak("Are there any storms near your local break? Please respond with '(yes/no) stormy'").listen("Are there any storms near your local break? Please respond with '(yes/no) stormy'");
    this.emit(':responseReady');
},
      
'stormIntent': function() {
    let storm = this.event.request.intent.slots.storm.value;
    if (storm == "yes"){
        report += " The surf will probably be big today.";
    }
    else if (storm == "no"){
        report += " The surf will probably be small today.";
    }
    else {
        report+= "";
    }
    this.response.speak("Is the tide high or low? Please respond with 'it is (high/low) tide'").listen("Is the tide high or low? Please respond with 'it is (high/low) tide'");
    this.emit(':responseReady');
},

'tideIntent': function() {
    let tide = this.event.request.intent.slots.tide.value;
    if (tide == "high"){
        report += " The surf will be more pitchy and break closer to the shore.";
    }
    else if (tide == "low"){
        report += " The surf will be weaker and breaking further out.";
    }
    else if (tide == "mid"){
        report += "The surf will be breaking just right.";
    }
    else {
        report+= "";
    }
    this.response.speak(report);
    this.emit(':responseReady');
    report = "";
},
};


// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
