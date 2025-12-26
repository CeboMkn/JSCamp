export function MostrandoNumRresults({ currentPage, results, jobs }) {
    return (
        <div className="mos_num_results">
            <p>Mostrando {(currentPage - 1) * results + 1} - {Math.min(currentPage * results, jobs.length)} de {jobs.length}
            </p>
        </div>
    )
}