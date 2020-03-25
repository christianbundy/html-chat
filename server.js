const express = require("express");
const ChatRoom = require("./templates/ChatRoom").ChatRoom;
const SignIn = require("./templates/SignIn").SignIn;
const PageWrapper = require("./templates/PageWrapper").PageWrapper;
const ChatText = require("./templates/ChatText").ChatText;
const stringToColor = require("./stringToColor").stringToColor;

const app = express();

const publish = (input) => {
  subscribers.forEach((fn, fnIndex) => {
    if (typeof fn === "function") {
      try {
        fn(input);
      } catch (e) {
        console.error(e);
        subscribers[fnIndex] = null;
      }
    }
  });
};

const subscribers = [];

subscribers.push(console.log);

// make all the files Iin 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.urlencoded());

let messageList = [];

const addToList = (message) => messageList.push(message);
subscribers.push(addToList);

const routeGetRootWithUserId = (config) => (request, response) => {
  let template = PageWrapper({
    title: config.pageTitle,
    children: ChatRoom({
      userName: request.params.id ? request.params.id : config.defaultUserName,
    }),
  });
  response.send(template);
};

const routeGetRoot = (config) => (request, response) => {
  let template = PageWrapper({
    title: config.pageTitle,
    children: SignIn(),
  });
  response.send(template);
};

const routePostRoot = () => (request, response) => {
  response.redirect(`/${request.body.user}`);
};

const routeGetMessages = () => (request, response) => {
  response.type("text/html");
  const write = (sentence) => {
    const line = `${sentence}`;
    response.write(line);
  };
  const cutoff = Math.max(messageList.length - 16, 0);
  const latest = messageList.slice(cutoff);
  if (cutoff !== 0) {
    messageList = latest;
  }
  subscribers.push(write);
  messageList.forEach(write);
};

const routePostMessages = () => (request, response) => {
  if (request.body.message) {
    publish(
      ChatText({
        color: stringToColor(request.body.user),
        user: request.body.user,
        children: request.body.message,
      })
    );
  }
  response.redirect(`/${request.body.user}`);
};

// this should come from a json file someday...
const appConfig = {
  listenPort: 3301,
  pageTitle: "This is a chatroom",
  defaultUserName: "Moose",
};

// Routes
app.get("/messages", routeGetMessages());
app.post("/messages", routePostMessages());

app.get("/", routeGetRoot());
app.post("/", routePostRoot());

app.get("/:id", routeGetRootWithUserId());

// listen for requests :)
const listener = app.listen(appConfig.listenPort, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
