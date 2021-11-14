function usernameChange(user) {

  //Changes the username

  $("#change-username").click(() => {

    $("#username-container").show();

    //displays the current username in the input field

    $("#username-input").val(user);
  });

  //warning message toggles between hide and show when wrong username is typed

  $("#username-input").keyup(() => {
    let temp_username = $.trim($(this).val());
    temp_username? $("#username-warning").hide() : $("#username-warning").show();
  });
}

module.exports = usernameChange;
