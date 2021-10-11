function imageAdd() {
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
}

module.exports = imageAdd;
