import templateInit from "./templateinit";
import ranWordArr from "./ranwordarr";
import imageAdd from "./imageadd";
import videoAdd from "./videoadd";

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
