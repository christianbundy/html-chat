const postRoot = (request, response) => {
  response.redirect(`/${request.body.user}`);
}

export default postRoot;
