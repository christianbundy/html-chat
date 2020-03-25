import { combineReducers } from 'redux';
import { POST_MESSAGE } from '../actions/actions';

const initialStateChat = [
  {user: 'Mr. Computer', message: "Hello you beautiful person!"}
];

const chat = (messageState = initialStateChat, action) => {
  switch (action.type) {
    case POST_MESSAGE:
      // we should do a check on `action.message.message` to check if there are
      // just a bunch of spaces, easy enough with a regex.
      return messageState
        .concat({
          user: action.message.user,
          message: action.message.message
        })
        // Return last n number of messages
        .slice(-Math.abs(action.message.chatBufferSize))
    default:
      return messageState;
  }
}

const reducers = combineReducers({
  chat
})

export default reducers;
