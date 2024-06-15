const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)


server.use(jsonServer.bodyParser)
server.post("/",(req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
        }
        next()
})

server.use(router)
server.listen(5000, () => {
    console.log('JSON Server is running')

})

