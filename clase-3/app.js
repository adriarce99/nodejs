const express = require('express')
const crypto = require('node:crypto')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schema/movies')

const PORT = process.env.PORT ?? 1234

const app = express()
app.use(express.json())
app.disable('x-powered-by')

const ACCEPTED_ORIGINS = [
  'https://movies.com',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:1234'
]

// Nuestro recurso ahora mismo es movies
// Retorna el JSON con las películas
app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  // cuando la petición es del mismo origin. Esta no se manda
  if ((ACCEPTED_ORIGINS.includes(origin)) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      // Busca alguna peli que tenga en su lista al genero
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      // Para este filtrado tambien vale .includes aunque no es casesensitive
      // movie => movie.genre.includes(genre)
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Rettorno de una sola película por id
app.get('/movies/:id', (req, res) => { // path-to-regexp. El :id es un parámetro dinámico
  const { id } = req.params // Sí tuvieses varios parámetros dinámicos aparecería en la lista
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).send({ message: 'Movie not Found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body) // Función de validacion a partir de esquema
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // Con esta validación ahora sería seguro hacer dentro del json el ...result.data

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data // Puedo hacerlo porque esta controlado el esquema antes
    /* Para cuando no valido bien
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster
    */
  }
  // Esto no es REST. Debería ir a una base de datos
  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
