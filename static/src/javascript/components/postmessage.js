const $ = require("jquery");

function postMessage() {

  //Username is extracted

  let username = JSON.parse(window.localStorage.getItem("user"));
  
  //Typing indicator set

  $("#message").keydown(function() {
    $.post("/typing", { username });
  });


  //Enter key can be used to send messages

  $(window).keyup(function(e) {
    if(e.keyCode === 13)
      sending();
  });

    
    
  //onclick of the send-btn button the sending() function is executed

  $("#send-btn").click(sending);
  
  function sending() {

      //Closes the additional-inputs if open and rotates the button

      if($("#additional-inputs-container").css("display") !== "none") {
        $("#additional-inputs-container").hide();
        $("#show-additional-inputs").css({ "transform": "rotate(0deg)" });
      }

      //Value from the input fields extracted

      const message = {
        user: username,
        text: $.trim($("#message").val()),
        image: $.trim($("#image").val()).split(" "),
        video: $.trim($("#video").val()).split(" ")
      };

      // console.table(message);

      //checks the validity of the message if valid then is posted to the server

      if (
        message.text !== "" ||
        message.image[0] !== "" ||
        message.video[0] !== ""
      )
        $.post("/message", { message });

      //When files are sent from the local Storage

      let inputFiles = $("#file-data");

      //FormData object is used to handle the HTML form data when sent in the background

      let fd = new FormData();

      //flag variable

      let i = inputFiles[0].files.length;

      //a while() loop is run and each file (files[i]) is sent to the API

      while (i > 0) {

        fd.append("file", inputFiles[0].files[i - 1]);

        //sender loaded and color set to red

        $("#sending-file").css({ "background": "red" });

        fetch("https://api.anonfiles.com/upload?token=3ba8122b5e3c9048", {
          mode: "no-cors",
          method: "POST",
          body: fd
        }).then((res) =>

          //sender background set to transparent

          $("#sending-file").css({ "background": "transparent" })
        );
        i--;
      }

      //Value set to null when buttons are clicked

      $("#message").val("");
      $("#image").val("");
      $("#video").val("");
      $("#file-data").val("");
    }
}

module.exports = postMessage;
