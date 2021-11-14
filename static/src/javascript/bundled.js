(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function loading() {

  //initializes the username with user from localStorage if avaliable

  let user = JSON.parse(window.localStorage.getItem("user"));

  if (user) $("#username-container").hide();

  //gets messages from localStorage saved before unloading

  let text = JSON.parse(window.localStorage.getItem("text"));

  if (text) $("#message").val(text);

  return user;
}

module.exports = loading;

},{}],2:[function(require,module,exports){
const onMessageAddedComponent = require("./onmessageadded");

function loadMessages(ranArr, user) {
  
  //generate random facts
  
  let ranFactsUrl = "https://uselessfacts.jsph.pl/random.json?language=en";
  
  $.get(ranFactsUrl, res => $("#facts").html(res.text));
  
  
  //gets the messages from the database
  
  $.get("/get", res => {
    
    //iterates through the responses
    
    res.map(message => onMessageAddedComponent(user, message, ranArr));
    
    //show fact show button

    $("#show-fact").show();
  });
}

module.exports = loadMessages;

},{"./onmessageadded":3}],3:[function(require,module,exports){
function onMessageAddedComponent(user, message, ranArr) {

    //hides random facts
    
    $("#facts").hide();
          
    //Shows chat list
      
    $("#chat-list").show();
        
    //Generates a random number

    let i = Math.floor(Math.random() * 14);

    //list-item initialized and declared

    let template = $("<li>").html(`<div>
                                    <header>
                                      <i>
                                        ${message.user + " " + ranArr[i]}:
                                      </i>
                                    </header>
                                    <main>
                                      <div>
                                        <p>
                                          ${message.text}
                                        </p>
                                      </div>
                                    </main>
                                    <footer>
                                      <small>
                                        on ${message.date} &#9773;
                                      </small>
                                    </footer>
                                  </div>`);

    template.addClass("list-item");

    //Customize username according to the person whose device it is

    if (message.user !== user)
      template.addClass("other-users");

    //if image url is specified

    if (message.image[0]) {
      message.image.map(el => {
        let image_temp = $("<img>")
          .attr("src", el)
          .attr(`onclick`, `window.open('${el}')`)
          .attr("alt", "image");
        template[0].children[0].children[1].append(image_temp[0]);
      });
    }

    //if video url is specified

    if (message.video[0]) {
      message.video.map(el => {
        let video_temp = $("<iframe>")
          .attr("src", `https://www.youtube.com/embed/${el}`)
          .attr("title", "an YouTube video")
          .attr("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
          .attr("allowfullscreen", true);
        template[0].children[0].children[1].append(video_temp[0]);
      });
    }

    //list-item appended

    $("#chat-list").append(template[0]);

    //Scrolled down to the bottom of the page when the event occurs

    $("#chat-list-container").scrollTop($("#chat-list").height());
}


module.exports = onMessageAddedComponent;
},{}],4:[function(require,module,exports){
function onPersonOnlineComponent(online_users) {
    
    let online_temp;

    $("#online").empty();
    online_users.map(el => {

        //Checks if the element is empty or not which happens when a user has not registered yet...

        if(el) {
            online_temp = $("<li>").html(el);
            $("#online").append(online_temp[0]);
        }
    });
}

module.exports = onPersonOnlineComponent;
},{}],5:[function(require,module,exports){
function onPersonTypingComponent(user, username, ranArr) {

    if(user !== username) {
        //Generates a random number
  
        let i = Math.floor(Math.random() * 14);
  
        //when an user types his message is show on the list
    
        $("#typing").html(`${ username } ${ ranArr[i] }...`);
    }
    else{
        //when an user types his message is show on the list
        
        $("#typing").html("You are typing...");
    }
      

    //makes the list visible for a brief moment, then makes it disappear and clears it's html content too

    $("#typing").show();
    setTimeout(() => {
        $("#typing").hide();
        $("#typing").empty();
    }, 2500);
}

module.exports = onPersonTypingComponent;
},{}],6:[function(require,module,exports){
function personOnline(user) {

  //For sending data about this user online status after 2000ms

  setTimeout(() => {
    user? $.post("/online", { user }): null;
  }, 2000);

  //When this user goes offline then this API sends data to the backend also checking if the user has logged before exiting the page, then only the name is sent to the backend

  //Before unloading the document

  $(window).on("beforeunload", () => {
    user? $.post("/offline", { user }): null;
  });

  //On changing visibility

  $(document).on("visibilitychange", () => {
    
    if (document.visibilityState === 'hidden') {

      //text value is fetched from input field and stored in localStorage when visibilityState is hidden

      let text = $("#message").val();

      window.localStorage.setItem("text", JSON.stringify(text));

      user? $.post("/offline", { user }): null;      
    } 
    
    else {
      user? $.post("/online", { user }): null;
    }
  });
}

module.exports = personOnline;
},{}],7:[function(require,module,exports){
function postMessage(user) {
  
  //Typing indicator set

  $("#message").on("input", () => $.post("/typing", { user }));

  //Enter key can be used to send messages

  $(window).keyup(e => (e.keyCode === 13)? sending(): null);
    
  //onclick of the send-btn button the sending() function is executed

  $("#send-btn").click(sending);
  
  function sending() {

      //Closes the additional-inputs if open and rotates the button

      if($("#additional-inputs-container").css("display") !== "none") {
        $("#additional-inputs-container").hide();
        $("#show-additional-inputs").css({ "transform": "rotate(0deg)" });
      }

      //Value from the input fields extracted

      const message = {
        user,
        text: $.trim($("#message").val()),
        image: $.trim($("#image").val()).split(" "),
        video: $.trim($("#video").val()).split(" ")
      };

      // console.table(message);

      //checks the validity of the message if valid then is posted to the server

      if (
        message.text ||
        message.image[0] ||
        message.video[0]
      )
        $.post("/message", { message });

      //When files are sent from the local Storage

      let inputFiles = $("#file-data");

      //FormData object is used to handle the HTML form data when sent in the background

      let fd = new FormData();

      //flag variable

      let i = inputFiles[0].files.length;

      //a while() loop is run and each file (files[i]) is sent to the API

      let anonFilesUrl = "https://api.anonfiles.com/upload?token=3ba8122b5e3c9048";

      while (i > 0) {

        fd.append("file", inputFiles[0].files[i - 1]);

        //sender shown

        $("#sending-file").show();

        fetch(anonFilesUrl, {
          mode: "no-cors",
          method: "POST",
          body: fd
        }).then(() =>

          //sender hidden

          $("#sending-file").hide());
        i--;
      }

      //Value set to null when buttons are clicked

      $("#message").val("");
      $("#image").val("");
      $("#video").val("");
      $("#file-data").val("");
    }
}

module.exports = postMessage;

},{}],8:[function(require,module,exports){
function toggleExtras() {
  
  //additional inputs for image url and YouTube videos

  $("#show-additional-inputs").click(() => {
    
    //rotates the button by 45deg everytime it is pressed
    
    if($("#additional-inputs-container").css("display") === "none")
      $(this).css({ "transform": "rotate(45deg)" });
    
    else
      $(this).css({ "transform": "rotate(0deg)" });

    $("#additional-inputs-container").toggle();
  });
      
  //toggle facts show button

  $("#show-fact").click(() => {
    $("#facts").toggle();
    $("#chat-list").toggle();

    //changes the HTML content of the toggle button

    if($(this).html() === "SHOW ME THE FACT!")
      $(this).html("SHOW ME THE CHAT!");
    else
      $(this).html("SHOW ME THE FACT!");

    //Scrolled to the bottom of the page

    $("#chat-list-container").scrollTop($("#chat-list").height());
  });
}

module.exports = toggleExtras;

},{}],9:[function(require,module,exports){
function usernameChange(user) {

  //Changes the username

  $("#change-username").click(() => {

    $("#username-container").show();

    //displays the current username in the input field

    $("#username-input").val(user);
  });

  //warning message toggles between hide and show when wrong username is typed

  $("#username-input").keyup(() => {
    let temp_username = $.trim($(this).val());
    temp_username? $("#username-warning").hide() : $("#username-warning").show();
  });
}

module.exports = usernameChange;

},{}],10:[function(require,module,exports){
function usernameInit(user) {

  //Sets the username for first time

  $("#username-btn").click(() => {
    
    //fetches the username from the input

    let temp_username = $.trim($("#username-input").val());

    //checks the validity of the username and if found valid stored in the localStorage

    if (temp_username) {

      $("#username-container").hide();

      //Removes present username

      $.post("/offline", { user });

      user = temp_username;
      window.localStorage.setItem("user", JSON.stringify(user));

      //Updates to everyone that someone has joined the chat or the current user has changed the username

      $.post("/online", { user });

      //For additional security reloads the page

      window.location.reload();

    } else $("#username-warning").show();
  });
}

module.exports = usernameInit;

},{}],11:[function(require,module,exports){
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

},{"./components/loading":1,"./components/loadmessages":2,"./components/onmessageadded":3,"./components/onpersononline":4,"./components/onpersontyping":5,"./components/persononline":6,"./components/postmessage":7,"./components/toggleextras":8,"./components/usernamechange":9,"./components/usernameinit":10}]},{},[11]);
