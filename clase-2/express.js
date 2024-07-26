const dittoJSON = require('./pokemon/ditto.json')
const express = require('express')

const PORT = process.env.PORT ?? 1234

const app = express()
// Esto evita que se vea la tecnología empleada . En este caso express (seguridad)
app.disable('x-powered-by')

// Gestion previa "middleware" común a todos los métodos. Se pueden filtrar por directorio
/*
Este caso valdría para todas las rutas que esten en pokemon
app.use('/pokemon/*', (req, res, next) => {
  console.log('Gestión middleware')
  next()
})
*/
app.use((req, res, next) => {
  console.log('Gestión middleware')
  next() // IMPORTANTE
})

// Cuando la app recibe una instruccion get en la ruta / entonces hace la fucnión
app.get('/pokemon/ditto', (req, res) => {
  // El status no es necesario
  res.json(dittoJSON)
  // Usar res.json devolvería un json
})

app.post('/pokemon', (req, res) => {
  let body = ''
  // Escuchando data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    res.status(201).json(data) // Fijate que se simplifica respecto del routing.js
  })
})

// Ultimo método que intentará probar
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
