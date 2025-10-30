export function Filters() {
    return (
        <section className="section_filter" id="filters">
            <div>
                <select name="tecnologia" id="filter-tecnologia" defaultValue="">
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

                <select name="ubicacion" id="filter-ubicacion" defaultValue="">
                    <option value="" disabled hidden>
                        Ubicación
                    </option>
                    <option value="remoto">Remoto</option>
                    <option value="mexico">Ciudad de México</option>
                    <option value="guadalajara">Guadalajara</option>
                </select>

                <select name="tipo_contrato" id="filter-tipo_contrato" defaultValue="">
                    <option value="" disabled hidden>
                        Tipo de contrato
                    </option>
                    <option value="tiempo_completo">Tiempo completo</option>
                    <option value="freelance">Freelance</option>
                    <option value="temporal">Temporal</option>
                    <option value="practicas">Prácticas</option>
                </select>

                <select name="nivel_experiencia" id="filter-nivel_experiencia" defaultValue="">
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
                <button type="button" id="btn_del_filters" className="btn_del_filters">
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
                        className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <span id="selected_value"></span>
        </section>
    )
}
