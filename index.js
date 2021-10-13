require("dotenv").config({ debug: process.env.DEBUG });
const express = require("express");
const bodyParser = require("body-parser");
const Pusher = require("pusher");
const { MongoClient } = require("mongodb");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));

const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER
});

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/get", function (req, res) {
  client.connect(async (err) => {
    const collection = client.db("chatListDB").collection("chatList");
    let allData = await collection.find({}).toArray();
    res.send(allData);
    console.log(allData);
    client.close();
  });
});

app.post("/message", function (req, res) {
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

  console.log(message);
  pusher.trigger("chat-room", "message-added", message);
  res.sendStatus(200);
});

app.get("/promotione", function (req, res) {
  client.connect(async (err) => {
    const collection = client.db("chatListDB").collection("chatList");
    await collection.drop();
    client.close();
  });
});

app.listen(process.env.HOST, () => console.log("sunte pacchi..."));
