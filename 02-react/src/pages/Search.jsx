import '../App.css'
import { JobListing } from '../components/JobListing.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { SearchFormSection } from '../components/SearchFormSection.jsx';
import { MostrandoNumRresults } from '../components/MostrandoNumResults.jsx';
import { useFilters } from '../hooks/search/useFilters.jsx';

export function SearchPage() {

  const RESULTS_PER_PAGE = 4

  const {
    loading,
    filters,
    currentPage,
    setCurrentPage,
    jobs,
    totalJobs,
    totalPages,
    handleFilters
  } = useFilters(RESULTS_PER_PAGE)

  return (
    <main className="main_estrecho">
      <div>

        <SearchFormSection onFilters={handleFilters} filters={filters} />

        {loading ? <p>Cargando Empleos...</p> : <JobListing jobsData={jobs} totalJobs={totalJobs} />}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        <MostrandoNumRresults currentPage={currentPage} results={RESULTS_PER_PAGE} jobs={jobs} />

      </div>
    </main>
  );
}
