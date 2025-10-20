
/* activar el botón aplicar */
const contain_btn = document.querySelector('.btn_active_contain')

contain_btn?.addEventListener('click', (e) => {
    const element = e.target
    if (element.classList.contains('btn_active')) {
        element.textContent = '¡Aplicado!'
        element.disabled = true
        element.style.backgroundColor = 'green'
    }
})

/* Variable que almacena los divs de cada resultado */
let containers_resultados
/* Variable que almacena el Json con todos los trabajos */
let allJobs = {}

let pageActual = 1
const RESULTS_PAGES = 4
let numbersNav = 0
const container_nav = document.querySelector('.paginacion ul')

/* Pedir datos al json */
get_jobs()
/* Activar los filtros del select */
activar_filtros()
/* Activar buscar por texto en el input */
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

    /* Aqui vamos a resetear los filtros, delegación de eventos en el botón de reset */
    filters_contain.addEventListener('click', (e) => {
        const target = e.target
        const btn_del = target.closest('#btn_del_filters')

        if (btn_del) {
            /* Seleccionamos todos los select dentro del contenedor con id filters
            Los recorremos y ponemos el index a 0 */
            document.querySelectorAll('#filters select').forEach(sel => {
                sel.selectedIndex = 0
            })
            /* Reseteamos filters, dejando todos sus elementos en '' */
            Object.keys(filters).forEach(key => {
                filters[key] = ''
            })
            /* Despues llamamos a aplicar filtros para aplicarlos con todo en '', entonces mostrara todos los resultados */
            aplicar_filtros()
        }
    })

    /* Aplicar los filtros ya puestos en la variable filters y con los containers de cada uno seleccionados */
    function aplicar_filtros() {

        /* Array con los filtros */
        const campos = ['tecnologia', 'ubicacion', 'tipo_contrato', 'nivel_experiencia'];

        /* Recorremos cada .res_busqueda en busca de coincidencias en sus dataset */
        containers_resultados.forEach(res => {
            /* Variable con los dataset de cada trabajo traido del data */
            const datos = res.dataset;

            /* Con el metodo every comprobamos si alguno de esos dataset contiene el filtro aplicado en los select, 
               con que uno de los filtros sea false, osea que no contiene el filtro aplicado, no va a seguir recorriendo
               los data y visible sera false */
            const visible = campos.every(campo => {
                /* Filtro es igual a lo asignado en filters de uno en uno */
                const filtro = filters[campo];
                /* Si no hay filtro aplicado (!filtro) o si alguno de los dataset coincide con el filtro aplicado (datos[campo].includes(filtro))
                   visible = true
                   Si hay filtro aplicado y no coincide con el dataset 
                   visible = false */
                return !filtro || datos[campo].includes(filtro);
            });

            /* Si visible el true ese contenedor de res_busqueda tiene display:"flex" (se muestra)
               Si visible es false ese contenedor de res_busqueda tiene display:"none" (se oculta)*/
            res.style.display = visible ? 'flex' : 'none';
        });
    }
}

/* Buscar resultados con el input */
function search_job() {
    const input = document.getElementById('search_input')
    /* Cada vez que escribimos en el input */
    input.addEventListener('input', () => {
        /* Recorremos los divs con los resultados */
        containers_resultados.forEach(res => {
            /* text_h es el titulo del trabajo */
            const text_h = res.querySelector('.title_job').textContent.toLowerCase()
            /* text_input es lo que escribimos en el buscador */
            const text_input = input.value.toLowerCase()
            /* con includes comprobamos si lo que escribimos coincide en algo con el titulo del trabajo */
            text_h.includes(text_input)
                /* si coincide se muestra, si no se oculta */
                ? res.style.display = 'flex'
                : res.style.display = 'none'
        })
    })
}

async function get_jobs() {

    await fetch("../01-javascript/data/data.json")
        .then(res => res.json())
        .then(jobs => {
            /* Almacenar los trabajos en allJobs */
            allJobs = jobs
            console.log(allJobs)
            /* Llamar a la funcion que renderiza los trabajos en la vista */
            renderJobs()
        });
    /* Almacenar los divs de los resultados en containers_results una vez que ya estan en el DOM */
    containers_resultados = document.querySelectorAll('.res_busqueda')
}

/* Renderizar los trabajos en la vista */
function renderJobs() {
    /* Seleccionamos el contendor donde se van a renderizar los trabajos */
    const container = document.getElementById('result_busqueda');
    container.innerHTML = "";

    /* Estas variables dicen desde que indice, hasta cual mostrar de la respuesta des JSON 
       como el json empieza en 0, empezamos desde 
       pageActual = 1 (1 - 1) * 4 = 0 
       pageActual = 2 (2 - 1) * 4 = 4 */
    const empezarAmostrar = (pageActual - 1) * RESULTS_PAGES
    console.log(empezarAmostrar)

    /* empezarAmostrar = 0 + 4 (muestra del JSON 0, 1, 2, 3) 
       empezarAmostrar = 4 + 4 (muestra del JSON 4, 5, 6, 7) */
    const hastaDondeMostrar = empezarAmostrar + RESULTS_PAGES
    console.log(hastaDondeMostrar)

    /* Esta variable contiene el numero de paginas que hay en la vista */
    numbersNav = Math.ceil(allJobs.length / 4)

    console.log('Paginas ' + numbersNav)
    /* El metodo slice corta un array, pasandole dos parametros, slice(dondemoiezoacortar, dondetermino) */
    const indicesQueSeMuestran = allJobs.slice(empezarAmostrar, hastaDondeMostrar)
    console.log(indicesQueSeMuestran)


    /* Recorremos la variable allJobs que contiene todos los trabajos
       Y uno a uno los vamos creando en el DOM */
    indicesQueSeMuestran.forEach(job => {
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
    generateNav()
}

function generateNav() {

    if (!container_nav) return;

    const prevLi = container_nav.firstElementChild;
    const nextLi = container_nav.lastElementChild;

    container_nav.innerHTML = ''
    container_nav.appendChild(prevLi)

    for (let i = 1; i <= numbersNav; i++) {
        const li = document.createElement('li')
        li.innerHTML = `<a href="#" data-page="${i}">${i}</a>`;
        if (i === 1) li.classList.add('pag_active')
        container_nav.appendChild(li)
    }

    container_nav.appendChild(nextLi)
}

navResultados()

function navResultados() {
    if (!container_nav) return
    container_nav.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target
        const link = target.closest('a')
        if (!link) return
        const numberPage = link.dataset.page;

        /* Si es un numero de página */
        if (numberPage) {
            pageActual = parseInt(numberPage)
            renderJobs()
            paginaActiva()
        }

        /* Si es una flecha */
        const li = link.closest('li')
        const prev = li.querySelector('.icon-tabler-chevron-left')
        const next = li.querySelector('.icon-tabler-chevron-right')



        if (prev && pageActual > 1) {
            pageActual--
            renderJobs()
            paginaActiva()
        }

        if (next && pageActual < numbersNav) {
            pageActual++
            renderJobs()
            paginaActiva()
        }

    })
}

function paginaActiva() {
    const lis = container_nav.querySelectorAll('li')
    lis.forEach(li => li.classList.remove('pag_active'))

    const activeli = Array.from(lis).find(li => {
        const a = li.querySelector('a');
        return a && parseInt(a.dataset.page) === pageActual;
    })

    if (activeli) activeli.classList.add('pag_active')
        
    const prevLi = container_nav.querySelector('li .icon-tabler-chevron-left')?.closest('li');
    const nextLi = container_nav.querySelector('li .icon-tabler-chevron-right')?.closest('li');
    if (prevLi) prevLi.classList.toggle('nav_disabled', pageActual === 1);
    if (nextLi) nextLi.classList.toggle('nav_disabled', pageActual === numbersNav);
}









