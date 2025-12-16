import { Jobcard } from "./JobCard";
import jobs from '../src/assets/data.json'

export function JobListing() {
    return (
        <section className="sect_res_busqueda btn_active_contain">
            <h2>Resultados de búsqueda</h2>
            <div className="select_person">
                <label className="label_num_result" htmlFor="num_result">
                    Número de resultados
                </label>
                <select name="num_result" id="num_result"></select>
            </div>
            <div id="jobs-listings" className="env_result">

                <Jobcard jobs={jobs} />

            </div>
        </section>
    );
}


