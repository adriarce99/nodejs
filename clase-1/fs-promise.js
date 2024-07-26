const fs = require('node:fs/promises')

fs.readFile('./archivo.txt', 'utf-8')
  .then(text => { // Esto es el equivalente al callback pero se usa más
    console.log(text)
  })
