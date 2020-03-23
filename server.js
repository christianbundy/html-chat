const express = require('express');
const ChatRoom = require('./templates/ChatRoom').ChatRoom;
const SignIn = require('./templates/SignIn').SignIn;
const PageWrapper = require('./templates/PageWrapper').PageWrapper;
const ChatText = require('./templates/ChatText').ChatText;
const stringToColor = require('./stringToColor').stringToColor;

const { Filigree } = require("filigree-text");

const app = express();

// let source = `
//     name = [aardvark/bushbaby/camel/dolphin/eagle/fox/gopher/hawk]
//     hello = [hello/hey/hi/ahoy/what up/heyo/oh hi/!!!]
//     suffix = [long time no see!/it's good to see you./I'm so happy you're here!/what's new with you?/I've missed you/what a pleasant surprise./since when do you hang out here?/this is so cool!/how's school going?/I want to hear what's new in your life!]
//     greeting = <name>: <hello> <name>, <suffix>\n
// `;

// parse your filigree source
// let fil = new Filigree(source); // seed is optional, omit it for different results every time
// if (fil.err) {
//   // if the source is has syntax errors, they will be shown here
//   throw new Error(fil.err.message);
// }

const publish = input => {
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
// generate a string from the "greeting" rule
// setInterval(() => {
//   if (Math.random() < 1 / 8) {
//     const sentence = fil.generate("greeting");
//     publish(ChatText({
//       color: 'grey',
//       user: 'name',
//       children: sentence
//     }));
//   }
// }, 1000);

const subscribers = [];

subscribers.push(console.log);

// make all the files Iin 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.urlencoded());

let messageList = [];

const addToList = message => messageList.push(message);
subscribers.push(addToList);

const routeGetRootWithUserId = config => (request, response) => {
  let template = PageWrapper({
    title: config.pageTitle,
    children: ChatRoom({
      userName: request.params.id ? request.params.id : config.defaultUserName
    })
  });
  response.send(template);
}

const routeGetRoot = config => (request, response) => {
  let template = PageWrapper({
    title: config.pageTitle,
    children: SignIn()
  });
  response.send(template);
}

const routePostRoot = config => (request, response) => {
  response.redirect(`/${request.body.user}`);
}

const routeGetMessages = config => (request, response) => {
  response.type('text/html');
  const write = sentence => {
    const line = `${sentence}`;
    response.write(line);
  };
  const cutoff = Math.max(messageList.length - 10, 0);
  const latest = messageList.slice(cutoff);
  if (cutoff !== 0) {
    messageList = latest;
  }
  subscribers.push(write);
  messageList.forEach(write);
};

const routePostMessages = config => (request, response) => {
  if (request.body.message) {
    publish(ChatText({
      color: stringToColor(request.body.user),
      user: request.body.user,
      children: request.body.message
    }));
  }
  response.redirect(`/${request.body.user}`);
}

// this should come from a json file someday...
const appConfig = {
  listenPort: 3301,
  pageTitle: 'This is a chatroom',
  defaultUserName: 'Moose'
}

const config = {};
// Routes
app.get("/messages", routeGetMessages(appConfig));
app.post("/messages", routePostMessages(appConfig));

app.get("/", routeGetRoot(appConfig));
app.post("/", routePostRoot(appConfig));

app.get("/:id", routeGetRootWithUserId(appConfig));

// listen for requests :)
const listener = app.listen(appConfig.listenPort, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
