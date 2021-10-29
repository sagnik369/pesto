const $ = require("jquery");
const loading = require("./components/loading");
const usernameInit = require("./components/usernameinit");
const personOnline = require("./components/persononline");
const usernameChange = require("./components/usernamechange");
const toggleExtras = require("./components/toggleextras");
const loadMessages = require("./components/loadmessages");
const postMessage = require("./components/postmessage");

$(document).ready(function () {

  //username is fetched from localStorage

  let user = JSON.parse(window.localStorage.getItem("user"));

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

  let i = 0;

  //When a message is emmited then this function is called

  function onMessageAdded(message) {

    //Plays audio

    let aud = new Audio("./src/audio/audio.mp3").play();

    //hides random facts
    
    $("#facts").css({ "display": "none" });
    
    //Shows chat list
    
    $("#chat-list").css({ "display": "block" });

    //Scrolled down to the bottom of the page when the event occurs

    $("#chat-list-container").scrollTop($("#chat-list").height());
    
    //Generates a random number

    i = Math.floor(Math.random() * 14);

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

    if (message.image[0] !== "") {
      message.image.forEach((el) => {
        let image_temp = $("<img>")
          .attr("src", el)
          .attr(`onclick`, `window.open('${el}')`)
          .attr("alt", "image");
        template[0].children[0].children[1].append(image_temp[0]);
      });
    }

    //if video url is specified

    if (message.video[0] !== "") {
      message.video.forEach((el) => {
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

  
  //Typing indicator


  function onPersonTyping(username) {

    if(user !== username) {
      //Generates a random number

      i = Math.floor(Math.random() * 14);

      //when an user types his message is show on the list
  
      $("#typing").html(`${ username } ${ ranArr[i] }...`);
    }
    
    else{
      //when an user types his message is show on the list
      
      $("#typing").html(`You are typing...`);
    }



    //makes the list visible for a brief moment, then makes it disappear and clears it's html content too

    $("#typing").css({ "opacity": ".8" });
    setTimeout(() => {
      $("#typing").css({ "opacity": "0" });
      $("#typing").html('');
    }, 2500);
  }



  //Gets data from the backend when a user comes online
  
  function onPersonOnline(online_users) {
    let online_temp;

    $("#online").html("");
    online_users.map(el => {

      //Checks if the element is empty or not which happens when a user has not registered yet...

      if(el) {
        online_temp = $("<li>").html(el);
        $("#online").append(online_temp[0]);
      }
    });
  }




  /*///////////////////////////////////////////
  Execution of the main script starts from here
  ///////////////////////////////////////////*/

  //Initialized pusher object with server key and cluster

  const pusher = new Pusher("95fc40ed5d00f761247b", {
    cluster: "ap2"
  });

  //Subscribed to channel and if the event in bind() occurs, then the callback gets executed

  const channel = pusher.subscribe("chat-room");
  channel.bind("message-added", onMessageAdded);
  channel.bind("person-typing", onPersonTyping);
  channel.bind("person-online", onPersonOnline);

  loading();

  usernameInit();

  personOnline();

  loadMessages();
  
  postMessage();
  
  usernameChange();
  
  toggleExtras();
});
