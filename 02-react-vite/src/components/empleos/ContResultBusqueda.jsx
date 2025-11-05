import jobsData from '../../data/data.json'
import { JobCard } from './JobCard'

export function ResultadosBusqueda() {
    return (
        <section className="sect_res_busqueda">
            <h2>Resultados de búsqueda</h2>
            <div id="result_busqueda" className="env_result">
                {jobsData.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </section>
    )
}
