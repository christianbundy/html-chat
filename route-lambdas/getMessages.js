import ChatText from '../templates/ChatText';

const getMessages = reduxStore => (request, response) => {
  // Get our redux `chat` object from the store.
  const messages = reduxStore.getState().chat
    // Iterate over it, render through the template
    .map(a => ChatText({user: a.user, children: a.message}))
    // Makes sure the new messages appear at the top. This is outside of the
    // the reducer because RENDERING order is purely a rendering concern.
    .reverse()
    // It's an array still, so we need to join it to remove the `,` from
    // rendering. We could put a devider between the chat lines here, if ever needed.
    // or even render a devider with the time every 30 minutes. Lots of useless
    // features!
    .join('') //


  response.type('text/html');
  response.write(messages);
};

export default getMessages
