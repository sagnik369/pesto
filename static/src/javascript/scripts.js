const loading = require("./components/loading");
const usernameInit = require("./components/usernameinit");
const personOnline = require("./components/persononline");
const onPersonTypingComponent = require("./components/onpersontyping");
const onPersonOnlineComponent = require("./components/onpersononline");
const onMessageAddedComponent = require("./components/onmessageadded");
const usernameChange = require("./components/usernamechange");
const toggleExtras = require("./components/toggleextras");
const loadMessages = require("./components/loadmessages");
const postMessage = require("./components/postmessage");

$(document).ready(function () {

  //username is fetched from localStorage

  let user = loading();

  //Random verbs

  let ranArr = [
    "wrote",
    "is wondering",
    "pondered",
    "suggests",
    "is thinking",
    "surprised you with",
    "said",
    "thinks",
    "thought",
    "is sharing",
    "uttered",
    "states",
    "writes",
    "utters"
  ];

  //When a message is emmited then this function is called

  function onMessageAdded(message) {

    //Plays audio

    let aud = new Audio("./src/audio/audio.mp3").play();

    onMessageAddedComponent(user, message, ranArr);
  }

  //Typing indicator

  function onPersonTyping(username) {
    onPersonTypingComponent(user, username, ranArr);
  }

  //Gets data from the backend when a user comes online
  
  function onPersonOnline(online_users) {
    onPersonOnlineComponent(online_users)
  }




  /*///////////////////////////////////////////
  Execution of the main script starts from here
  ///////////////////////////////////////////*/

  //Initialized pusher object with server key and cluster

  const pusher = new Pusher("95fc40ed5d00f761247b", {
    cluster: "ap2"
  });

  //Subscribed to channel and if the event occurs, then the callback gets executed

  const channel = pusher.subscribe("chat-room");
  channel.bind("message-added", onMessageAdded);
  channel.bind("person-typing", onPersonTyping);
  channel.bind("person-online", onPersonOnline);

  usernameInit(user);

  personOnline(user);

  loadMessages(ranArr, user);
  
  postMessage(user);
  
  usernameChange(user);
  
  toggleExtras();
});
