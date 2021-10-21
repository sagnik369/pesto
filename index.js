//requiring dependencies

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const { MongoClient } = require("mongodb");

//declaring an express object

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));

//declaring Pusher confguration

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER
});

//declaring MongoClient confguration

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//ARRAY TO KEEP TRACK OF ONLINE USERS

var online_users = [];

/*////////
Routes set
////////*/

//Home path

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
  res.end();
});

//Path for getting the messages from the database and users who are online

app.get("/get", function (req, res) {

  client.connect(async (err) => {
    const collection = client.db("chatListDB").collection("chatList");
    let allData = await collection.find({}).toArray();
    res.json({ allData, online_users });
    client.close();
  });
});

//Route when a user comes online

app.post("/online", function (req, res) {
  var username = req.body.user;

  //Checks if the user has refreshed the page or not
  //Sends the data to the other clients only if the user was not present in the online_users list

  if(!(online_users.includes(username))) {
    online_users.push(username);
  }
  pusher.trigger("chat-room", "person-online", online_users);
  res.sendStatus(200);
  res.end();
});

//Route when a user gets offline

app.post("/offline", function (req, res) {

  var username = req.body.user;

  //Does not check if the user has refreshed the page but sends the data anyway which will be overwritten in client side
  //Filters the user who is attempting to leave the page

  let online_users_temp = online_users.filter((user) => user !== username);
  online_users = online_users_temp;
  pusher.trigger("chat-room", "person-online", online_users);
  res.sendStatus(200);
  res.end();
});

//Typing indicator route

app.post("/typing", function (req, res) {
  var username = req.body.username;

  pusher.trigger("chat-room", "person-typing", username);
  res.sendStatus(200);
  res.end();
});

//Path for posting a message

app.post("/message", function (req, res) {

  //Extracts the video's path

  req.body.message.video.forEach((el, ind, ar) => {
    if (el.substr(0, 19) === "https://www.youtube") ar[ind] = el.substr(32, 11);
    if (el.substr(0, 16) === "https://youtu.be") ar[ind] = el.substr(17, 11);
  });

  var message = {
    user: req.body.message.user,
    text: req.body.message.text,
    image: req.body.message.image,
    video: req.body.message.video,
    date: new Date().toUTCString()
  };

  client.connect(async (err) => {
    const collection = client.db("chatListDB").collection("chatList");
    await collection.insertOne(message);
    client.close();
  });

  pusher.trigger("chat-room", "message-added", message);
  res.sendStatus(200);
  res.end();
});

//Path for deleting all the data from the database

app.get("/promotione", function (req, res) {
  client.connect(async (err) => {
    const collection = client.db("chatListDB").collection("chatList");
    await collection.drop();
    client.close();
  });
  res.send("OK");
  res.end();
});

app.listen(process.env.PORT || 3000);
