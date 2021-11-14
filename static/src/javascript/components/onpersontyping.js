function onPersonTypingComponent(user, username, ranArr) {

    if(user !== username) {
        //Generates a random number
  
        let i = Math.floor(Math.random() * 14);
  
        //when an user types his message is show on the list
    
        $("#typing").html(`${ username } ${ ranArr[i] }...`);
    }
    else{
        //when an user types his message is show on the list
        
        $("#typing").html("You are typing...");
    }
      

    //makes the list visible for a brief moment, then makes it disappear and clears it's html content too

    $("#typing").show();
    setTimeout(() => {
        $("#typing").hide();
        $("#typing").empty();
    }, 2500);
}

module.exports = onPersonTypingComponent;