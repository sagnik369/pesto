const $ = require("jquery");

function loadMessages() {
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

  //gets the messages from the database

  $.get("/get", function (res) {
    res.forEach((message) => {
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

      if (message.user !== JSON.parse(window.localStorage.getItem("user")))
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
      //Scrolled down to the bottom of the page when the messages load

      $("#chat-list-container").scrollTop($("#chat-list").height());
    });
  });
}

module.exports = loadMessages;