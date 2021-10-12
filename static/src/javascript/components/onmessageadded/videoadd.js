const $ = require("jquery");
function videoAdd() {
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
}

module.exports = videoAdd;
