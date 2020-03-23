exports.ChatText = props => `
  <div style="font-family: sans-serif; font-size: 1.1em;">
    <strong style="color: ${props.color}">${props.user}:</strong> ${props.children}
  </div>
`
