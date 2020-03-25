const SignIn = props => `
  <main class="c-sign-in">
    <form class="c-sign-in__form" action="/" method="post">
      <input class="c-sign-in__user-name c-text-input" type="text" name="user" placeholder="Name">
      <button class="c-sign-in__submit c-button" type="submit">Join Chat</button>
    </form>
  </main>
`;
export default SignIn;
