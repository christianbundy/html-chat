import Send from './icons/Send'

const ChatRoom = props => `
  <main class="c-chat">
    <form class="c-chat__chat-form" action="/messages" method="post" autocomplete="off">
      <input class="u-hidden" name="user" type="text" value="${props.userName}">
      <input class="c-chat__message-input c-text-input" autofocus name="message" type="text" />
      <button class="c-chat__message-send c-button" type="submit">Send ${Send({color: 'white', size: '16'})}</button>
    </form>
    <iframe class="c-chat__view" src="/messages"></iframe>
  </main>
`
export default ChatRoom;
