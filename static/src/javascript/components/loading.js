const $ = require("jquery");

function loading() {
  
  //initializes the username with user from localStorage if avaliable

  var user = JSON.parse(window.localStorage.getItem("user"));
  if (!user) $("#username-container").show();
}

module.exports = loading;
