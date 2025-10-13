const contain_btn = document.querySelector('.btn_active_contain')

contain_btn?.addEventListener('click', (e) => {
    const element = e.target
    if (element.classList.contains('btn_active')) {
        element.textContent = '¡Aplicado!'
        element.disabled = true
        element.style.backgroundColor = 'green'
    }
})

/* Filtros que se van a aplicar */
let filters = {
    tecnologia: '',
    ubicacion: '',
    tipo_contrato: '',
    nivel_experiencia: ''
}

/* Seleccionamos el contenedor de los select y los contenedores de resultados de la busqueda */
const filters_contain = document.getElementById('filters')
const resultados = document.querySelectorAll('.res_busqueda')

/* Cada vez que un select cambia se activa el listener con delegacion de eventos */
filters_contain.addEventListener('change', (e) => {

    const target = e.target
    /* Creamos dos variables (id y value) cogeran el id del select donde ocurrio el evento y su value */
    const { id, value } = target

    /* Si el id empieza por (filter-)  */
    if (id.startsWith('filter-')) {
        /* Coge la parte que va despues de filter */
        const key = id.replace("filter-", "")
        /* En filters asignamos el value segun la key */
        filters[key] = value.toLowerCase()
        /* Ahora aplicamos la visivilidad segun lo que vale filters */
        aplicar_filtros()
    }

})

/* Aqui vamos a resetear los filtros */
filters_contain.addEventListener('click', (e) => {
    const target = e.target
    const btn_del = target.closest('#btn_del_filters')

    if (btn_del) {
        document.querySelectorAll('#filters select').forEach(sel => {
            sel.selectedIndex = 0
        })
        Object.keys(filters).forEach(key => {
            filters[key] = ''
        })
        aplicar_filtros()
    }
})

function aplicar_filtros() {

    /* Array con los filtros */
    const campos = ['tecnologia', 'ubicacion', 'tipo_contrato', 'nivel_experiencia'];

    /* Recorremos cada .res_busqueda en busca de coincidencias en sus dataset */
    resultados.forEach(res => {
        /* Variable con los dataset de cada select */
        const datos = res.dataset;

        /* Con el metodo every comprobamos si alguno de esos dataset contiene el filtro aplicado en los select 
           con que uno de los filtros sea false, osea que no contiene el filtro aplicado no va a seguir recorriendo
           los data y sisible sera false */
        const visible = campos.every(campo => {
            /* Filtro es igual a lo asignado en filters de uno en uno */
            const filtro = filters[campo];
            /* Si no hay filtro aplicado o si alguno de los dataset coincide con el filtro aplicado visible = true
               Si hay filtro aplicado y no coincide con el dataset visible = false */
            return !filtro || datos[campo].includes(filtro);
        });

        /* Si visible el true ese contenedor de res_busqueda tiene display:"flex" (se muestra)
           Si visible es false ese contenedor de res_busqueda tiene display:"none" (se oculta)*/
        res.style.display = visible ? 'flex' : 'none';
    });
}





