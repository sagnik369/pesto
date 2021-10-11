function templateInit() {
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
}

module.exports = templateInit;
