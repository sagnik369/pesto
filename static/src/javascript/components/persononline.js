const $ = require("jquery");

function personOnline() {
    
  //username is fetched from localStorage

  let user = JSON.parse(window.localStorage.getItem("user"));

  //For sending data about this user online status

  if(user)
      $.post("/online", { user });

  //When this user goes offline then this API sends data to the backend also checking if the user has logged before exiting the page, then only the name is sent to the backend

  $(document).on("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {
      if(user)
      $.post("/offline", { user });
    } else {
      if(user)
      $.post("/online", { user });
    }
  });
}

module.exports = personOnline;