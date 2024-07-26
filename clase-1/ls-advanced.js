const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.' // La doble interrogación sirve para definir un valor como default

async function ls(folder) {
  let files

  // Lectura de archivos con su correspondiente control de error
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`No se pudo leer el directorio ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async file => { // El async es para que la funcion anónima que estamos haciendo sea asíncrona
    const filePath = path.join(folder, file) // Se crea la ruta completa
    let stats
    try {
      stats = await fs.stat(filePath) // Se obtienen los datos del fichero con ese path
    } catch {
      console.error(`No se pudo leer el archivo ${filePath}`)
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(25))} ${fileSize.toString().padStart(10)} ${fileModified}`
  })

  const filesInfo = await Promise.all(filesPromises) // Recupera todas las promesas de las instrucciones realizadas en la lectura de los ficheros y cracion de sus string
  filesInfo.forEach(fileInfo => { console.log(fileInfo) })
}

ls(folder)
