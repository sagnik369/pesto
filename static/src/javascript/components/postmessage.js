function postMessage(user) {
  
  //Typing indicator set

  $("#message").on("input", () => $.post("/typing", { user }));

  //Enter key can be used to send messages

  $(window).keyup(e => (e.keyCode === 13)? sending(): null);
    
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
        user,
        text: $.trim($("#message").val()),
        image: $.trim($("#image").val()).split(" "),
        video: $.trim($("#video").val()).split(" ")
      };

      // console.table(message);

      //checks the validity of the message if valid then is posted to the server

      if (
        message.text ||
        message.image[0] ||
        message.video[0]
      )
        $.post("/message", { message });

      //When files are sent from the local Storage

      let inputFiles = $("#file-data");

      //FormData object is used to handle the HTML form data when sent in the background

      let fd = new FormData();

      //flag variable

      let i = inputFiles[0].files.length;

      //a while() loop is run and each file (files[i]) is sent to the API

      let anonFilesUrl = "https://api.anonfiles.com/upload?token=3ba8122b5e3c9048";

      while (i > 0) {

        fd.append("file", inputFiles[0].files[i - 1]);

        //sender shown

        $("#sending-file").show();

        fetch(anonFilesUrl, {
          mode: "no-cors",
          method: "POST",
          body: fd
        }).then(() =>

          //sender hidden

          $("#sending-file").hide());
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
