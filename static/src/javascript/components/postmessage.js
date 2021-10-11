function postMessage() {
  //onclick of send button values from input fields are worked upon

  $("#send-btn").click(function () {
    //Value from the input fields extracted

    const message = {
      user: username,
      text: $.trim($("#message").val()),
      image: $.trim($("#image").val()).split(" "),
      video: $.trim($("#video").val()).split(" ")
    };

    //Value set to null

    $("#message").val("");

    // console.log(message);
    //checks the validity of the message if valid then is posted to the server

    if (
      message.text !== "" ||
      message.image[0] !== "" ||
      message.video[0] !== ""
    )
      $.post("https://rqux6.sse.codesandbox.io/message", { message });
  });
}

module.exports = postMessage;
