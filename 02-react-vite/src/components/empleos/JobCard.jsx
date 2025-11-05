import { useState } from 'react';

export function JobCard({ job }) {
    const [isApplied, setIsApplied] = useState(false)

    const cambiarAaplicado = () => {
        setIsApplied(true)
    }

    const buttonClass = isApplied ? 'btn_info btn_is_applied' : 'btn_info'
    const buttonText = isApplied ? 'Aplicado' : 'Aplicar'
    const disabled = isApplied ? true : false

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
                <button className={buttonClass} onClick={cambiarAaplicado} type="submit" disabled={disabled}>{buttonText}</button>
            </div>
        </article>
    )
}