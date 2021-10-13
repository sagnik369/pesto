const $ = require("jquery");
function postMessage() {
  //onclick of send button values from input fields are worked upon

  $("#send-btn").click(function () {
    //Value from the input fields extracted

    let username = JSON.parse(window.localStorage.getItem("user"));
    const message = {
      user: username,
      text: $.trim($("#message").val()),
      image: $.trim($("#image").val()).split(" "),
      video: $.trim($("#video").val()).split(" ")
    };

    //Value set to null when buttons are clicked

    $("#message").val("");
    $("#image").val("");
    $("#video").val("");

    // console.table(message);

    //checks the validity of the message if valid then is posted to the server

    if (
      message.text !== "" ||
      message.image[0] !== "" ||
      message.video[0] !== ""
    )
      $.post("https://9ktto.sse.codesandbox.io/message", { message });
  });
}

module.exports = postMessage;
