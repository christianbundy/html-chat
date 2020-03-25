const PageWrapper = props => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${props.title}</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="A chat room" />

      <!-- import the webpage's stylesheet -->
      <link rel="stylesheet" href="/style.css" />

      <!-- import the webpage's client-side javascript file -->
      <script src="/script.js" defer></script>
    </head>
    <body>
      ${props.children}
    </body>
  </html>
`;

export default PageWrapper;
