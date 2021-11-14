function onPersonOnlineComponent(online_users) {
    
    let online_temp;

    $("#online").empty();
    online_users.map(el => {

        //Checks if the element is empty or not which happens when a user has not registered yet...

        if(el) {
            online_temp = $("<li>").html(el);
            $("#online").append(online_temp[0]);
        }
    });
}

module.exports = onPersonOnlineComponent;