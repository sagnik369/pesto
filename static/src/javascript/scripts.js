const APIConnect = require("./components/APIconnect");
const loading = require("./components/loading");
const usernameInit = require("./components/usernameinit");
const usernameChange = require("./components/usernamechange");
const toggleExtras = require("./components/toggleextras");
const messageInput = require("./components/messageinput");
const postMessage = require("./components/postmessage");
const onMessageAdded = require("./components/onmessageadded/onmessageadded");

$(document).ready(function () {
  APIConnect();

  loading();

  usernameInit();

  usernameChange();

  toggleExtras();

  messageInput();

  postMessage();
});
