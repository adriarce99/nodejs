// LECTURA ASINCRONA
const fs = require('node:fs')

// Fijate que como es un evento de callback no hay que guardarlo en una constante

fs.readFile('./archivo.txt', 'utf-8', (err, text) => { // Cuando termina, ejecuta el callback
  console.log(text)
})
