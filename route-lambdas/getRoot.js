import SignIn from '../templates/SignIn';
import PageWrapper from '../templates/PageWrapper';

const getRoot = config => (request, response) => {
  const template = PageWrapper({
    title: config.pageTitle,
    children: SignIn()
  });
  response.send(template);
};

export default getRoot;
