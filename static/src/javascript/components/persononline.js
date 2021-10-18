const $ = require("jquery");

function personOnline() {
    let username = JSON.parse(window.localStorage.getItem("user"));
    $.post("/online", { username });
}

module.exports = personOnline;