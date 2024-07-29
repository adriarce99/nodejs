const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Required title'
  }),
  year: z.number().int().min(1900).max(2024), // Encadena validaciones
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Crime']),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: ' Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie(object) {
  return movieSchema.safeParse(object) // Si todo sale bien te da los datos. Si no devuelve error
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input) // El partial hace opcionales las entradas pero mantiene las restricciones de entradas
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
