import { useId } from "react"

export function FormGrande({ applyFilters }) {
    const idText = useId()
    const idTecnology = useId()
    const idUbi = useId()
    const idTipo = useId()
    const idNivel = useId()
    const idBtnReset = useId()

    const handleFilters = (e) => {
        e.preventDefault()

        const form = e.target.closest("form")
        const formData = new FormData(form)

        const filters = {
            search: formData.get(idText),
            tecnologia: formData.get(idTecnology),
            ubicacion: formData.get(idUbi),
            tipo: formData.get(idTipo),
            nivel: formData.get(idNivel)
        }

        applyFilters(filters)
    }

    const resetFilters = (e) => {
        const form = e.target.closest("form")
        form.reset()
        const filters = {
            search: '',
            tecnologia: '',
            ubicacion: '',
            tipo: '',
            nivel: ''
        }

        applyFilters(filters)
    }

    return (
        <form className="form_princi w-100" action="#" role="search">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
                <input
                    id="search_input"
                    name={idText}
                    onChange={handleFilters}
                    type="text"
                    placeholder="Buscar trabajos, empresas o habilidades"
                />
            </div>
            <div className="section_filter" id="filters">
                <div>
                    <select name={idTecnology} onChange={handleFilters} id="filter-tecnologia" defaultValue="">
                        <option value="" disabled hidden>
                            Tecnología
                        </option>
                        <option value="javascript">JavaScript</option>
                        <option value="react">React</option>
                        <option value="nodejs">Node.js</option>
                        <option value="python">Python</option>
                        <option value="sql">SQL</option>
                        <option value="erre">R</option>
                        <option value="swift">Swift</option>
                        <option value="kotlin">Kotlin</option>
                        <option value="aws">AWS</option>
                        <option value="azure">Azure</option>
                        <option value="gcp">GCP</option>
                    </select>

                    <select name={idUbi} onChange={handleFilters} id="filter-ubicacion" defaultValue="">
                        <option value="" disabled hidden>
                            Ubicación
                        </option>
                        <option value="remoto">Remoto</option>
                        <option value="mexico">Ciudad de México</option>
                        <option value="guadalajara">Guadalajara</option>
                    </select>

                    <select name={idTipo} onChange={handleFilters} id="filter-tipo_contrato" defaultValue="">
                        <option value="" disabled hidden>
                            Tipo de contrato
                        </option>
                        <option value="tiempo_completo">Tiempo completo</option>
                        <option value="freelance">Freelance</option>
                        <option value="temporal">Temporal</option>
                        <option value="practicas">Prácticas</option>
                    </select>

                    <select name={idNivel} onChange={handleFilters} id="filter-nivel_experiencia" defaultValue="">
                        <option value="" disabled hidden>
                            Nivel de experiencia
                        </option>
                        <option value="junior">Junior</option>
                        <option value="semi_senior">Semi-Senior</option>
                        <option value="senior">Senior</option>
                        <option value="lead">Tech Lead</option>
                    </select>
                </div>

                <div>
                    <button type="button" onClick={resetFilters} name={idBtnReset} id="btn_del_filters" className="btn_del_filters">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}
