const $ = require("jquery");

function loading() {

  //initializes the username with user from localStorage if avaliable

  let user = JSON.parse(window.localStorage.getItem("user"));

  if (user) $("#username-container").hide();

  //gets messages from localStorage saved before unloading

  let text = JSON.parse(window.localStorage.getItem("text"));

  if (text) $("#message").val(text);
}

module.exports = loading;
