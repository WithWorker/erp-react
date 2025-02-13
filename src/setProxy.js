const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function(app){
    app.use(
        '/api', //api가 붙은 요청에 대해서는 통과
        createProxyMiddleware({
            target:'http://localhost:8000', //spring boot backend URL
            changeOrigin: true 
        })
    )
}
