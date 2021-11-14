function personOnline(user) {

  //For sending data about this user online status after 2000ms

  setTimeout(() => {
    user? $.post("/online", { user }): null;
  }, 2000);

  //When this user goes offline then this API sends data to the backend also checking if the user has logged before exiting the page, then only the name is sent to the backend

  //Before unloading the document

  $(window).on("beforeunload", () => {
    user? $.post("/offline", { user }): null;
  });

  //On changing visibility

  $(document).on("visibilitychange", () => {
    
    if (document.visibilityState === 'hidden') {

      //text value is fetched from input field and stored in localStorage when visibilityState is hidden

      let text = $("#message").val();

      window.localStorage.setItem("text", JSON.stringify(text));

      user? $.post("/offline", { user }): null;      
    } 
    
    else {
      user? $.post("/online", { user }): null;
    }
  });
}

module.exports = personOnline;