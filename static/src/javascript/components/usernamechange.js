const $ = require("jquery");

function usernameChange() {
  //Changes the username

  $("#change-username").click(function () {
    let username = JSON.parse(window.localStorage.getItem("user"));
    $("#username-container").show();

    //displays the current username in the input field

    $("#username-input").val(username);
  });

  //warning message toggles between hide and show when wrong username is typed

  $("#username-input").keyup(function () {
    let temp_username = $.trim($("#username-input").val());
    if (temp_username !== "") $("#username-warning").hide();
    else $("#username-warning").show();
  });
}

module.exports = usernameChange;
