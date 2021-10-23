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

  //generate random facts

  $.get("https://uselessfacts.jsph.pl/random.json?language=en", function(res) {
    $("#facts").html(`${ res.text }`);
  });


  //gets the messages from the database
  
  $.get("/get", function(res) {

    //iterates through the responses

    res.allData.forEach((message) => {

      //hides random facts

      $("#facts").css("display", "none");

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
                                          ${message.text}                                        </h3>
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
            .attr("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
            .attr("allowfullscreen", true);
          template[0].children[0].children[1].append(video_temp[0]);
        });
      }

      //list-item appended

      $("#chat-list").append(template[0]);
      
      //Scrolled down to the bottom of the page when the messages load

      $("#chat-list-container").scrollTop($("#chat-list").height());

      //show fact show button

      $("#show-fact").show();
    });

    //For displaying the users who are online

    let online_temp;

    res.online_users.map(el => {

      //Checks if the element is empty or not which happens when a user has not registered yet...

      if(el) {
        online_temp = $("<li>").html(el);
        $("#online").append(online_temp[0]);
      }
    });
  });
}

module.exports = loadMessages;
