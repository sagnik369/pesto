const $ = require("jquery");
const loading = require("./components/loading");
const usernameInit = require("./components/usernameinit");
const usernameChange = require("./components/usernamechange");
const toggleExtras = require("./components/toggleextras");
const messageInput = require("./components/messageinput");
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
                                        <h3>
                                          "${message.text}"
                                        </h3>
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
  
      $("#typing").html(`You are typing...`);
    }

    else
      //when an user types his message is show on the list
  
      $("#typing").html(`${ username } ${ ranArr[i] }...`);



    //makes the list visible for a brief moment, then makes it dissappear and clears it's html content too

    $("#typing").css({ "opacity": ".8" });
    setTimeout(() => {
      $("#typing").css({ "opacity": "0" });
      $("#typing").html('');
    }, 3500);
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


  loading();

  usernameInit();

  usernameChange();

  toggleExtras();

  messageInput();

  loadMessages();

  postMessage();
});
