const $ = require("jquery");
function usernameInit() {
  let username = "";

  //Sets the username for first time

  $("#username-btn").click(function () {
    //fetches the username from the input

    let temp_username = $.trim($("#username-input").val());

    //checks the validity of the username and if found valid stored in the localStorage

    if (temp_username !== "") {
      $("#username-container").hide();
      username = temp_username;
      localStorage.setItem("user", JSON.stringify(username));
    } else $("#username-warning").show();
  });
}

module.exports = usernameInit;
