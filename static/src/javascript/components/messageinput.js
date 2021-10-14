const $ = require("jquery");

function messageInput() {
  //additional inputs for image url and YouTube videos

  $("#show-additional-inputs").click(function () {
    $("#additional-inputs-container").show();
  });

  $("#close-additional-inputs").click(function () {
    $("#additional-inputs-container").hide();
  });
}

module.exports = messageInput;
