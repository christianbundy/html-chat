import stringToColor from '../stringToColor';

const cChat = `
  align-items: center;
  display: flex;
  flex-wrap: no-wrap;
  font-family: sans-serif;
  margin-top: .5em;
`
const cChat__Icon = `
  align-items: center;
  border-radius: 1000px;
  color: white;
  display: flex;
  flex: 0 0 2.8em;
  font-size: 1em;
  height: 2.8em;
  justify-content: center;
  margin-right: .5em;
  width 2.8em;
  font-weight: bold;
`

const cChat__UserName = `
  font-size: .8em;
  margin-bottom: .2em;
`

const ChatText = props => `
  <div style="${cChat}">
    <div style="${cChat__Icon} background-color: ${stringToColor(props.user)}">
      ${props.user.substring(0, 1).toUpperCase()}
    </div>
    <div>
      <div style="${cChat__UserName} color:${stringToColor(props.user)}">${props.user}</div>
      <div>${props.children}</div>
    </div>
  </div>
`
export default ChatText
