export const renderFullPage = (html, port, domain, initialState = null) => {
  const bundleCSS = initialState !== null
        || process.env.NODE_ENV === 'production'
          ? `<link
              rel="stylesheet"
              type="text/css"
              href="http://${domain}:${port}/dist/bundle.css"
            ></style>`
          : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
      ${bundleCSS}
      </head>
      <body>
        <div id="root">${html || ''}</div>

        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState || {})};
        </script>

        <script src="http://${domain}:${port}/dist/vendor.js"></script>
        <script src="http://${domain}:${port}/dist/main.js"></script>
      </body>
    </html>`;
};
