function loading() {
  //initializes the username with user from localStorage if avaliable

  var username = JSON.parse(localStorage.getItem("user"));
  if (username === null) $("#username-container").show();
}

module.exports = loading;