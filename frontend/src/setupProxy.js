// filepath: d:\js\messenger\frontend\src\setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                console.log('Proxying request:', req.url);
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err);
            }
        })
    );
};