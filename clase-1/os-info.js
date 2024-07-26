const os = require('node:os')

console.log('Información sistema operativo:')
console.log('------------------------------')

console.log('Nombre sistema operativo', os.platform())
console.log('Versión sistema operativo', os.release())
console.log('CPUs', os.cpus())
