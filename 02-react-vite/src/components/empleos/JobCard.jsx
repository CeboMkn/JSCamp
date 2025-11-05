
export function JobCard({ job }) {
    return (
        <article className="res_busqueda"
            data-modalidad={job.data.modalidad}
            data-ubicaion={job.data.ubicacion}
            data-tipo_contrato={job.data.tipo}
            data-nivel_experiencia={job.data.nivel}
        >
            <div>
                <a href="#">
                    <h3 className="title_job">{job.titulo}</h3>
                </a>
                <p className="first_p">{job.empresa} | {job.ubicacion}</p>
                <p className="second_p">{job.descripcion}</p>
            </div>
            <div>
                <button className="btn_info" type="submit">Aplicar</button>
            </div>
        </article>
    )
}