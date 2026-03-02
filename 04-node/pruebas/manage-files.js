import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'

let content = ''
let content_dos = ''

/* Leer archivo original */
if (process.permission.has('fs.read', 'archivo.txt')) {
    content = await readFile('archivo.txt', 'utf-8')
} else {
    console.error('No se tienen permisos para leer archivo.txt') 
}

const outputDir = join('output', 'files', 'documents')
const outputPath = join(outputDir, 'archivo_en_mayusculas.txt')
const uppercase = content.toUpperCase()

/* Escribir archivo */
// Verificamos permiso de escritura en la ruta de salida
if (process.permission.has('fs.write', outputDir)) { 
    await mkdir(outputDir, { recursive: true })
    await writeFile(outputPath, uppercase)
} else {
    console.error('No se tienen permisos para escribir en:', outputDir)
}

/* Leer archivo creado */
if (process.permission.has('fs.read', outputPath)) {
    content_dos = await readFile(outputPath, 'utf-8')
} else {
    console.error('No se tienen permisos para leer el archivo de salida', content_dos)
}

console.log(`\n--- Reporte ---`)
console.log(`Archivo: ${basename(outputPath)}`)
console.log(`Extensión: ${extname(outputPath)}`)
console.log(`Contenido nuevo: ${content_dos}`)