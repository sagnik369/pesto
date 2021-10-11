function usernameChange() {
  //Changes the username

  $("#change-username").click(function () {
    $("#username-container").show();
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
