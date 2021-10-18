const $ = require("jquery");

function toggleExtras() {
  
  //additional inputs for image url and YouTube videos

  $("#show-additional-inputs").click(function () {
    
    //rotates the button by 45deg everytime it is pressed
    
    if($("#additional-inputs-container").css("display") === "none")
      $(this).css({ "transform": "rotate(45deg)" });
    
    else
      $(this).css({ "transform": "rotate(0deg)" });

    $("#additional-inputs-container").toggle();
  });
      
  //toggle facts show button

  $("#show-fact").click(function() {
    $("#facts").toggle();
    $("#chat-list").toggle();

    //changes the HTML content of the toggle button

    if($(this).html() === "SHOW ME THE FACT!")
      $(this).html("SHOW ME THE CHAT!")
    else {
      $(this).html("SHOW ME THE FACT!")
      $("#chat-list-container").scrollTop($("#chat-list").height());
    }
  });
}

module.exports = toggleExtras;
