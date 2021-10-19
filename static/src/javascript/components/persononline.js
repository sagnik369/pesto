const $ = require("jquery");

function personOnline() {
    
  //username is fetched from localStorage

  let user = JSON.parse(window.localStorage.getItem("user"));

  //When this user comes online then this API sends data to the backend also checking if username is present in local storage

  if(user)
    $.post("/online", { user });

  $(window).on("beforeunload", function() {
    if(user)
      $.post("/offline", { user });
  });
}

module.exports = personOnline;