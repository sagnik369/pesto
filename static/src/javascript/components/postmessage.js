const $ = require("jquery");
function postMessage() {
  //onclick of send button values from input fields are worked upon

  $("#send-btn").click(function () {
    //Value from the input fields extracted

    let username = JSON.parse(localStorage.getItem("user"));
    const message = {
      user: username,
      text: $.trim($("#message").val()),
      image: $.trim($("#image").val()).split(" "),
      video: $.trim($("#video").val()).split(" ")
    };

    //Value set to null

    $("#message").val("");

    console.log(message);
    //checks the validity of the message if valid then is posted to the server

    if (
      message.text !== "" ||
      message.image[0] !== "" ||
      message.video[0] !== ""
    )
      $.post("http://192.168.0.102:3000/message", { message });
  });
}

module.exports = postMessage;
