const sec_result = document.getElementById('result_busqueda')

sec_result?.addEventListener('click', (e) => {
    const element = e.target
    if (element.classList.contains('btn_active')) {
        element.textContent = '¡Aplicado!'
        element.disabled = true
        element.style.backgroundColor = 'green'
    }
})


let filters = {
    tecnologia: '',
    ubicacion: '',
    tipo_contrato: '',
    nivel_experiencia: ''
}

const filters_contain = document.getElementById('filters')
const resultados = document.querySelectorAll('.res_busqueda')

filters_contain.addEventListener('change', (e) => {

    const { id, value } = e.target

    if (id.startsWith('filter-')) {
        const key = id.replace("filter-", "")
        filters[key] = value.toLowerCase()
        console.log(filters)
        aplicar_filtros()
    }
})

function aplicar_filtros() {
    resultados.forEach((res) => {
        const matchtec = !filters.tecnologia || res.dataset.tecnologia.includes(filters.tecnologia)
        const matchubi = !filters.ubicacion || res.dataset.ubicacion.includes(filters.ubicacion)
        const matchtipo = !filters.tipo_contrato || res.dataset.tipo_contrato.includes(filters.tipo_contrato)
        const matchnivel = !filters.nivel_experiencia || res.dataset.nivel_experiencia.includes(filters.nivel_experiencia)

        res.style.display = matchtec && matchubi && matchtipo && matchnivel ? "flex" : "none"
    })
}





