const express = require("express");
const { Filigree } = require("filigree-text");

const app = express();

let source = `
    name = [aardvark/bushbaby/camel/dolphin/eagle/fox/gopher/hawk]
    hello = [hello/hey/hi/ahoy/what up/heyo/oh hi/!!!]
    suffix = [long time no see!/it's good to see you./I'm so happy you're here!/what's new with you?/I've missed you/what a pleasant surprise./since when do you hang out here?/this is so cool!/how's school going?/I want to hear what's new in your life!]
    greeting = <name>: <hello> <name>, <suffix>\n
`;

// parse your filigree source
let fil = new Filigree(source); // seed is optional, omit it for different results every time
if (fil.err) {
  // if the source is has syntax errors, they will be shown here
  throw new Error(fil.err.message);
}

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
setInterval(() => {
  if (Math.random() < 1 / 8) {
    const sentence = fil.generate("greeting");
    publish(sentence);
  }
}, 1000);

const subscribers = [];

subscribers.push(console.log);

// make all the files Iin 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.urlencoded());

let messageList = [];

const addToList = message => messageList.push(message);
subscribers.push(addToList);

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/messages", (request, response) => {
  response.type("text/plain");
  const write = sentence => {
    const line = `${sentence}\n`;
    response.write(line);
  };

  subscribers.push(write);
  const cutoff = Math.max(messageList.length - 10, 0);

  const latest = messageList.slice(cutoff);
  if (cutoff !== 0) {
    messageList = latest;
  }

  messageList.forEach(write);
});

app.post("/messages", (request, response) => {
  if (request.body.message) {
    publish(`me: ${request.body.message}`);
  }
  response.redirect("/");
});

// listen for requests :)
const listener = app.listen(3301, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
