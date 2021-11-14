const onMessageAddedComponent = require("./onmessageadded");

function loadMessages(ranArr, user) {
  
  //generate random facts
  
  let ranFactsUrl = "https://uselessfacts.jsph.pl/random.json?language=en";
  
  $.get(ranFactsUrl, res => $("#facts").html(res.text));
  
  
  //gets the messages from the database
  
  $.get("/get", res => {
    
    //iterates through the responses
    
    res.map(message => onMessageAddedComponent(user, message, ranArr));
    
    //show fact show button

    $("#show-fact").show();
  });
}

module.exports = loadMessages;
