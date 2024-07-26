const path = require('node:path')

// Muestra el tipo de separador del sistema operativo
console.log(path.sep)

// Unir rutas
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('/tmp/adri/adri_pato/fichero.txt')
console.log(base)

const filename = path.basename('/tmp/adri/adri_pato/fichero.txt', '.txt')
console.log(filename)

const extension = path.extname('image.jpg')
console.log(extension)
