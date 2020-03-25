import ChatRoom from '../templates/ChatRoom';
import PageWrapper from '../templates/PageWrapper';

const getRootWithUserId = config => (request, response) => {
  const template = PageWrapper({
    title: config.pageTitle,
    children: ChatRoom({
      userName: request.params.id ? request.params.id : config.defaultUserName
    })
  });
  response.send(template);
}

export default getRootWithUserId;
