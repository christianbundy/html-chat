// Bring in The Big Girls ------------------------------------------------------
import express from 'express';
import { createStore } from 'redux';

// State Management ------------------------------------------------------------
import reducers from './reducers/reducers';

// Route Lambdas ---------------------------------------------------------------
import getRoot from './route-lambdas/getRoot';
import postRoot from './route-lambdas/postRoot';
import getRootUserId from './route-lambdas/getRootUserId';
import postMessages from './route-lambdas/postMessages';
import getMessages from './route-lambdas/getMessages';
import settings from './settings'

// Constants -------------------------------------------------------------------
const app = express();
const store = createStore(reducers);

// Express Settings ------------------------------------------------------------
// make all the files in 'public' available:
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.urlencoded());


// Listeners -------------------------------------------------------------------
/* eslint-disable no-console, no-unused-vars*/
// Montor store in server console & listen for requests :)
const reduxListener = store.subscribe(() => console.log(store.getState()))
const expressListener = app.listen(settings.listenPort, () => {
  console.log(`Listening on port: ${expressListener.address().port}`);
});
/* eslint-enable no-console, no-unused-vars*/

// Routes ----------------------------------------------------------------------
// Messages
app.get("/messages", getMessages(store));
app.post("/messages", postMessages(settings, store));

// Root
app.get("/:id", getRootUserId(settings));

// Login Page/Root
app.get("/", getRoot(settings));
app.post("/", postRoot);
