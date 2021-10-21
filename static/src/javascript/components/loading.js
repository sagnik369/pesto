const $ = require("jquery");

function loading() {

  //initializes the username with user from localStorage if avaliable

  let user = JSON.parse(window.localStorage.getItem("user"));

  if (user) $("#username-container").hide();
}

module.exports = loading;
