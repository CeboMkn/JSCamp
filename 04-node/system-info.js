import os from 'node:os'
import ms from 'ms'

console.log('Información del sistema:')

console.log('Plataforma: ', os.platform())
console.log('Arquitectura: ', os.arch())
console.log('Número de CPU: ', os.cpus().length)
console.log('Memoria total: ', os.totalmem())
console.log('Memoria libre: ', os.freemem())
console.log('Tiempo de actividad: ', ms(os.uptime() * 1000))


