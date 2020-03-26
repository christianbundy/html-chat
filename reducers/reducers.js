import { combineReducers } from 'redux';
import { POST_MESSAGE } from '../actions/actions';

const initialStateChat = [
  {user: 'Mr. Computer', message: "Hello you beautiful person!"}
];

const isBlankLine = str => RegExp(/^(\s+|\t+)$|(^$)/).test(str);

const chat = (messageState = initialStateChat, action) => {
  switch (action.type) {
    case POST_MESSAGE:
      // Is it *not* a blank line?
      if (!isBlankLine(action.message.message)) {
        // Not blank.
        return messageState
          .concat({user: action.message.user, message: action.message.message})
          // Return last n number of messages
          .slice(-Math.abs(action.message.chatBufferSize))
      }
      // Blank, just perform the default.
      return messageState
    default:
      return messageState;
  }
}

const reducers = combineReducers({
  chat
})

export default reducers;
