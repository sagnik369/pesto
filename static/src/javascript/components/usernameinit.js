const $ = require("jquery");

function usernameInit() {

  //Gets the current username
  
  let user =  JSON.parse(window.localStorage.getItem("user"));

  //Sets the username for first time

  $("#username-btn").click(function () {
    
    //fetches the username from the input

    let temp_username = $.trim($("#username-input").val());

    //checks the validity of the username and if found valid stored in the localStorage

    if (temp_username) {

      $("#username-container").hide();

      //Removes present username

      $.post("/offline", { user });

      user = temp_username;
      window.localStorage.setItem("user", JSON.stringify(user));

      //Updates to everyone that someone has joined the chat or the current user has changed the username

      $.post("/online", { user });

      //For additional security reloads the page

      window.location.reload();

    } else $("#username-warning").show();
  });
}

module.exports = usernameInit;
