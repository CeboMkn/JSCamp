const contain_btn = document.querySelector('.btn_active_contain')

contain_btn?.addEventListener('click', (e) => {
    const element = e.target
    if (element.classList.contains('btn_active')) {
        element.textContent = '¡Aplicado!'
        element.disabled = true
        element.style.backgroundColor = 'green'
    }
})

let resultados
get_jobs()
activar_filtros()
search_job()

function activar_filtros() {
    /* Filtros que se van a aplicar */
    let filters = {
        tecnologia: '',
        ubicacion: '',
        tipo_contrato: '',
        nivel_experiencia: ''
    }

    /* Seleccionamos el contenedor de los select y los contenedores de resultados de la busqueda */
    const filters_contain = document.getElementById('filters')

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
        console.log('Console de aplicar filtros' + resultados)

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
}

function search_job() {
    const input = document.getElementById('search_input')
    input.addEventListener('input', () => {
        resultados.forEach(res => {
            const text_h = res.querySelector('.title_job').textContent.toLowerCase()
            const text_input = input.value.toLowerCase()
            text_h.includes(text_input)
                ? res.style.display = 'flex'
                : res.style.display = 'none'
        })
    })
}

async function get_jobs() {

    await fetch("../01-javascript/data.json")
        .then(res => res.json())
        .then(jobs => {
            const container = document.getElementById('result_busqueda');
            container.innerHTML = "";

            jobs.forEach(job => {
                const div = document.createElement('div');
                div.className = 'res_busqueda';

                div.dataset.tecnologia = job.data.tecnologia;
                div.dataset.ubicacion = job.data.ubicacion;
                div.dataset.tipo_contrato = job.data.tipo;
                div.dataset.nivel_experiencia = job.data.nivel;

                div.innerHTML = `
          <div>
            <a href="${job.enlace}">
              <h3 class="title_job">${job.titulo}</h3>
            </a>
            <p class="first_p">${job.empresa} | ${job.ubicacion}</p>
            <p class="second_p">${job.descripcion}</p>
          </div>
          <div>
            <button class="btn_info btn_active" type="submit">Aplicar</button>
          </div>`;

                container.appendChild(div);
            });
        });
    resultados = document.querySelectorAll('.res_busqueda')
    console.log('Console del fetch' + resultados)
}

/* listener click, blur(se dispara cuando el campo puerde el foco), input, change, keydown */


// const filter = document.getElementById('filter-tecnologia')
// const mensaje = document.getElementById('selected_value')


// filter.addEventListener('change', () => {
//     const jobs = document.querySelectorAll('.res_busqueda')
//     const selected_value = filter.value;

//     jobs.forEach(job => {
//         const tecnologia = job.dataset.tecnologia;
//         const semuestra = selected_value === '' || tecnologia.includes(selected_value)

//         job.classList.toggle('is-hidden', semuestra === false)
//     });
// });











