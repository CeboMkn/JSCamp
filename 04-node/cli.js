import { readdir, stat } from "node:fs/promises"
import { join } from "node:path"

// 1. Recuperar la carpeta a listar
const dir = process.argv[2] || '.'

// 2. Formateo simple de los tamaños
const formatBytes = (size) => {
    if (size < 1024) return size + ' B'
    return (size / 1024).toFixed(2) + ' KB'
}

// 3. Leer los nombres, sin info
const files = await readdir(dir)

// 4. Leer los nombres con info
const entries = await Promise.all(
    files.map(async (name) => {
        const fullPath = join(dir, name)
        const info = await stat(fullPath)
        return {
            name,
            isDir: info.isDirectory(),
            size: formatBytes(info.size)
        }
    })
)

for (const entry of entries) {
    const icon = entry.isDir ? '📁' : '📄'
    const size = entry.isDir ? '' : `${entry.size}`
    console.log(`${icon}  ${entry.name.padEnd(30)}${size}`)
}



/* MEJORAS */

/* import { readdir, stat } from "node:fs/promises"
import { join } from "node:path"

// 1. Recuperar carpeta y validar existencia básica
const dir = process.argv[2] ?? '.'

// 2. Formateador profesional (soporta hasta GB)
const formatSize = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024
    i++
  }
  return `${bytes.toFixed(1).replace('.0', '')} ${units[i]}`
}

async function listFiles() {
  try {
    // 3. Obtener archivos con su tipo (evita muchos stats innecesarios)
    const files = await readdir(dir, { withFileTypes: true })

    const entries = await Promise.all(
      files.map(async (file) => {
        const fullPath = join(dir, file.name)
        let size = 0
        
        // Solo pedimos stat si es un archivo (las carpetas suelen dar 0 o 4KB)
        if (file.isFile()) {
          const info = await stat(fullPath)
          size = info.size
        }

        return {
          name: file.name,
          isDir: file.isDirectory(),
          size: size ? formatSize(size) : ''
        }
      })
    )

    // 4. Ordenar: Carpetas primero, luego archivos por nombre
    entries.sort((a, b) => b.isDir - a.isDir || a.name.localeCompare(b.name))

    console.log(`\n Listing: ${dir}\n${'-'.repeat(45)}`)

    for (const { name, isDir, size } of entries) {
      const icon = isDir ? '📁' : '📄'
      // padEnd con espacios y un color visual simulado
      const nameCol = name.slice(0, 25).padEnd(27)
      const sizeCol = size.padStart(10)
      
      console.log(`${icon} ${nameCol} ${sizeCol}`)
    }

  } catch (err) {
    console.error(`❌ Error al leer la carpeta: ${err.message}`)
    process.exit(1)
  }
}

listFiles() */