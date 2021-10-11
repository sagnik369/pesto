(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function APIConnect() {
  //Initialized pusher object with server key and cluster

  const pusher = new Pusher("95fc40ed5d00f761247b", {
    cluster: "ap2"
  });

  //Subscribed to channel and if the event in bind() occurs, then the callback gets executed

  pusher.subscribe("chat-room").bind("message-added", onMessageAdded);
}

module.exports = APIConnect;

},{}],2:[function(require,module,exports){
function loading() {
  //initializes the username with user from localStorage if avaliable

  var username = JSON.parse(localStorage.getItem("user"));
  if (username === null) $("#username-container").show();
}

module.exports = loading;

},{}],3:[function(require,module,exports){
function messageInput() {
  //additional inputs for image url and YouTube videos

  $("#show-additional-inputs").click(function () {
    $("#additional-inputs-container").show();
  });

  $("#close-additional-inputs").click(function () {
    $("#additional-inputs-container").hide();
  });
}

module.exports = messageInput;

},{}],4:[function(require,module,exports){
// import templateInit from "./templateinit";
// import ranWordArr from "./ranwordarr";
// import imageAdd from "./imageadd";
// import videoAdd from "./videoadd";

function onMessageAdded(message) {
  ranWordArr();

  templateInit();

  template.addClass("list-item");

  imageAdd();

  videoAdd();

  //list-item appended

  $("#chat-list").append(template[0]);

  //Scrolled down to the bottom of the page when the event occurs

  $("#chat-list-container").scrollTop($("#chat-list").height());
}

module.exports = onMessageAdded;

},{}],5:[function(require,module,exports){
function postMessage() {
  //onclick of send button values from input fields are worked upon

  $("#send-btn").click(function () {
    //Value from the input fields extracted

    const message = {
      user: username,
      text: $.trim($("#message").val()),
      image: $.trim($("#image").val()).split(" "),
      video: $.trim($("#video").val()).split(" ")
    };

    //Value set to null

    $("#message").val("");

    // console.log(message);
    //checks the validity of the message if valid then is posted to the server

    if (
      message.text !== "" ||
      message.image[0] !== "" ||
      message.video[0] !== ""
    )
      $.post("https://rqux6.sse.codesandbox.io/message", { message });
  });
}

module.exports = postMessage;

},{}],6:[function(require,module,exports){
function toggleExtras() {
  //additional inputs for image url and YouTube videos

  $("#show-additional-inputs").click(function () {
    $("#additional-inputs-container").show();
  });

  $("#close-additional-inputs").click(function () {
    $("#additional-inputs-container").hide();
  });
}

module.exports = toggleExtras;

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
function usernameInit() {
  //Sets the username for first time

  $("#username-btn").click(function () {
    //fetches the username from the input

    let temp_username = $.trim($("#username-input").val());

    //checks the validity of the username and if found valid stored in the localStorage

    if (temp_username !== "") {
      $("#username-container").hide();
      username = temp_username;
      localStorage.setItem("user", JSON.stringify(username));
    } else $("#username-warning").show();
  });
}

module.exports = usernameInit;

},{}],9:[function(require,module,exports){
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

},{"./components/APIconnect":1,"./components/loading":2,"./components/messageinput":3,"./components/onmessageadded/onmessageadded":4,"./components/postmessage":5,"./components/toggleextras":6,"./components/usernamechange":7,"./components/usernameinit":8}]},{},[9]);
