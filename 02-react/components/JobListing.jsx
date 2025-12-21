import { JobCard } from "./JobCard";

export function JobListing({ jobsData }) {
    return (
        <section className="sect_res_busqueda btn_active_contain">
            <h2>Resultados de búsqueda</h2>
            {/* <div className="select_person">
                <label className="label_num_result" htmlFor="num_result">
                    Número de resultados
                </label>
                <select name="num_result" id="num_result"></select>
            </div> */}
            <div id="jobs-listings" className="env_result">
                {jobsData.length === 0 ? (
                    <p>No hay trabajos por el momento</p>
                ) : (
                    jobsData.map(job => (
                        <JobCard key={job.id} job={job} />
                    ))
                )}
            </div>
        </section>
    );
}

