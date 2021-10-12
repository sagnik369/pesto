const $ = require("jquery");
const loading = require("./components/loading");
const usernameInit = require("./components/usernameinit");
const usernameChange = require("./components/usernamechange");
const toggleExtras = require("./components/toggleextras");
const messageInput = require("./components/messageinput");
const postMessage = require("./components/postmessage");

$(document).ready(function () {
  function onMessageAdded(message) {
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

    //if image url is specified

    if (message.image[0] !== "") {
      message.image.forEach((el) => {
        let image_temp = $("<img>")
          .attr("src", el)
          .attr(`onclick`, `window.open('${el}')`)
          .attr("alt", "image");
        template[0].children[0].children[1].append(image_temp[0]);
        // console.log(template[0].children[0].children[1]);
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
        // console.log(template[0].children[0].children[1]);
      });
    }

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
