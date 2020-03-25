import { postMessage } from '../actions/actions';

const postMessages = (config, reduxStore) => (request, response) => {
  reduxStore.dispatch(postMessage({
    user: request.body.user,
    message: request.body.message,
    chatBufferSize: config.chatBufferSize
  }));
  response.redirect(`/${request.body.user}`);
};

export default postMessages
