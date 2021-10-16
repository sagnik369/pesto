const $ = require("jquery");

function postMessage() {
  //onclick of send button values from input fields are worked upon

  $("#send-btn").click(function () {
    //Closes the additional-inputs if open

    $("#additional-inputs-container").hide();

    //Value from the input fields extracted

    let username = JSON.parse(window.localStorage.getItem("user"));
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

      //sender loaded and color set to orangered

      $("#sending-file").css("background", "red");

      fetch("https://api.anonfiles.com/upload?token=3ba8122b5e3c9048", {
        mode: "no-cors",
        method: "POST",
        body: fd
      }).then((res) =>
        //sender background set to transparent

        $("#sending-file").css("background", "transparent")
      );
      i--;
    }

    //Value set to null when buttons are clicked

    $("#message").val("");
    $("#image").val("");
    $("#video").val("");
    $("#file-data").val("");
  });
}

module.exports = postMessage;
