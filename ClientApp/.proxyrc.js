const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/weatherforecast', {
            target: 'http://localhost:41750/',
            // pathRewrite: {
            //   "^/api": "",
            // },
        }),
    )
}