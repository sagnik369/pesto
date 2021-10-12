const $ = require("jquery");
// const APIConnect = require("./components/APIconnect");
const loading = require("./components/loading");
const usernameInit = require("./components/usernameinit");
const usernameChange = require("./components/usernamechange");
const toggleExtras = require("./components/toggleextras");
const messageInput = require("./components/messageinput");
const postMessage = require("./components/postmessage");
const templateInit = require("./components/onmessageadded/templateinit");
const ranWordArr = require("./components/onmessageadded/ranwordarr");
const imageAdd = require("./components/onmessageadded/imageadd");
const videoAdd = require("./components/onmessageadded/videoadd");

$(document).ready(function () {
  
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
  
    //Initialized pusher object with server key and cluster

  const pusher = new Pusher("95fc40ed5d00f761247b", {
    cluster: "ap2"
  });

  //Subscribed to channel and if the event in bind() occurs, then the callback gets executed

  pusher.subscribe("chat-room").bind("message-added", onMessageAdded);
  
  loading();
  
  usernameInit();
  
  usernameChange();

  toggleExtras();

  messageInput();

  postMessage();

});
