import { mkdir, readFile, writeFile } from 'node:fs/promises'

const content = await readFile('./archivo.txt', 'utf-8')
console.log(content)

const outputDir = 'output/files/documents/'
await mkdir(outputDir, { recursive: true })

const uppercase = content.toUpperCase()
await writeFile(`./${outputDir}/archivo_en_mayusculas.txt`, uppercase)
console.log(`Archivo creado en mayusculas en la carpeta ${outputDir}archivo_en_mayusculas.txt`)

const content_dos = await readFile(`${outputDir}archivo_en_mayusculas.txt`, 'utf-8')
console.log(content_dos)


