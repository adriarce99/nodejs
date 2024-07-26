const http = require('node:http')

const dittoJSON = require('./pokemon/ditto.json')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto': {
          res.setHeader('Content-Type', 'aplication/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        }
        default: {
          res.setHeader('Content.Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
        }
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // Escuchando data
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            data.timestamp = Date.now()
            // Aqui podria llamar a una base de datos
            // Otra forma de escribir el header
            res.writeHead(201, { 'Content-Type': 'aplication/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
          break
        }
        default: {
          res.setHeader('Content.Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
        }
      }
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
