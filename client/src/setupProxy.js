const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/v2',
        createProxyMiddleware({
            target: 'https://api.nusmods.com',
            secure: false,
            changeOrigin: true
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true
        })
    );
};
