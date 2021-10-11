function APIConnect() {
  //Initialized pusher object with server key and cluster

  const pusher = new Pusher("95fc40ed5d00f761247b", {
    cluster: "ap2"
  });

  //Subscribed to channel and if the event in bind() occurs, then the callback gets executed

  pusher.subscribe("chat-room").bind("message-added", onMessageAdded);
}

module.exports = APIConnect;
